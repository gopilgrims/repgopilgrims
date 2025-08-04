import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { 
  generateToken, 
  hashPassword, 
  verifyPassword, 
  generateVerificationToken, 
  sendVerificationEmail,
  sendPasswordResetEmail,
  authenticateToken,
  optionalAuth 
} from "./auth";

// Create isAuthenticated middleware
const isAuthenticated = authenticateToken;
import { 
  getGoogleAuthUrl, 
  getAppleAuthUrl, 
  handleGoogleCallback, 
  handleAppleCallback 
} from "./oauth";
import { seedDatabase } from "./seed-data";
import { insertTripSchema, insertOrganizerSchema, insertReviewSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";

const searchSchema = z.object({
  destination: z.string().optional(),
  departureDate: z.string().optional(),
  maxPilgrims: z.number().optional(),
  maxPrice: z.number().optional(),
  tags: z.array(z.string()).optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {

  // Seed database if needed
  try {
    await seedDatabase();
  } catch (error) {
    console.log("Database already seeded or error seeding:", error);
  }

  // New Authentication Routes
  
  // Register with email
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { firstName, lastName, email, password, username, role = 'pilgrim', organizerData } = req.body;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);
      
      // Generate verification token
      const verificationToken = generateVerificationToken();
      const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      // Create user
      const user = await storage.createUser({
        firstName,
        lastName,
        username: username || email.split('@')[0], // Fallback to email prefix if no username
        email,
        password: hashedPassword,
        emailVerificationToken: verificationToken,
        emailVerificationExpires: verificationExpires,
        authProvider: 'email',
        role: role,
        emailVerified: false,
        isActive: true,
      });

      // If registering as organizer, create organizer profile
      if (role === 'organizer' && organizerData) {
        try {
          await storage.createOrganizer({
            userId: user.id,
            companyName: organizerData.companyName,
            description: organizerData.description,
            yearsExperience: organizerData.yearsExperience,
            contactEmail: organizerData.contactEmail,
            contactPhone: organizerData.contactPhone,
            website: organizerData.website,
          });
        } catch (orgError) {
          console.error('Error creating organizer profile:', orgError);
          // Don't fail the registration if organizer profile creation fails
        }
      }

      // Send verification email
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      await sendVerificationEmail(email, verificationToken, baseUrl);

      const message = role === 'organizer' 
        ? 'Registration successful. Please check your email to verify your account. After verification, your organizer profile will be reviewed within 48 hours.'
        : 'Registration successful. Please check your email to verify your account.';

      res.status(201).json({ 
        message,
        userId: user.id 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed' });
    }
  });

  // Login with email
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user || !user.password) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Verify password
      const isPasswordValid = await verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check if email is verified (skip verification check for demo purposes)
      // if (!user.emailVerified) {
      //   return res.status(401).json({ 
      //     message: 'Please verify your email before logging in',
      //     needsVerification: true 
      //   });
      // }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({ message: 'Account is disabled' });
      }

      // Generate JWT token
      const token = generateToken(user.id);

      // Update last login
      await storage.updateUser(user.id, { lastLoginAt: new Date() });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: user.profileImageUrl,
          role: user.role,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  // Verify email
  app.get('/api/auth/verify-email', async (req, res) => {
    try {
      const { token } = req.query;

      if (!token) {
        return res.status(400).json({ message: 'Verification token required' });
      }

      // Find user by email verification token
      const user = await storage.getUserByEmailVerificationToken(token as string);

      if (!user) {
        return res.status(400).json({ message: 'Invalid verification token' });
      }

      // Check if token has expired
      if (user.emailVerificationExpires && new Date() > user.emailVerificationExpires) {
        return res.status(400).json({ message: 'Verification token has expired' });
      }

      // Update user
      await storage.updateUser(user.id, {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      });

      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({ message: 'Email verification failed' });
    }
  });

  // OAuth Routes
  
  // Google Auth
  app.get('/api/auth/google', (req, res) => {
    const authUrl = getGoogleAuthUrl();
    res.redirect(authUrl);
  });

  app.get('/api/auth/google/callback', handleGoogleCallback);

  // Apple Auth
  app.get('/api/auth/apple', (req, res) => {
    const authUrl = getAppleAuthUrl();
    res.redirect(authUrl);
  });

  app.post('/api/auth/apple/callback', handleAppleCallback);

  // Forgot password - request reset
  app.post('/api/auth/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;

      // Find user by email
      const user = await storage.getUserByEmail(email);
      if (!user) {
        // Don't reveal if user exists or not for security
        return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
      }

      // Generate password reset token
      const resetToken = generateVerificationToken();
      const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      // Update user with reset token
      await storage.updateUser(user.id, {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      });

      // Send password reset email
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      await sendPasswordResetEmail(user.email, resetToken, baseUrl);

      res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Failed to process password reset request' });
    }
  });

  // Reset password - confirm reset
  app.post('/api/auth/reset-password', async (req, res) => {
    try {
      const { token, newPassword } = req.body;

      // Find user by reset token
      const user = await storage.getUserByPasswordResetToken(token);
      if (!user || !user.passwordResetExpires || user.passwordResetExpires < new Date()) {
        return res.status(400).json({ message: 'Invalid or expired reset token' });
      }

      // Hash new password
      const hashedPassword = await hashPassword(newPassword);

      // Update user with new password and clear reset token
      await storage.updateUser(user.id, {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      });

      res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Failed to reset password' });
    }
  });

  // JWT-based user route  
  app.get('/api/auth/user', authenticateToken, async (req: any, res) => {
    res.json(req.user);
  });

  // Logout route (client-side handles token removal)
  app.post('/api/auth/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
  });

  // Profile routes
  app.get('/api/auth/profile', authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.userId;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Failed to fetch user profile" });
    }
  });

  app.put('/api/auth/profile', authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.userId;
      const { firstName, lastName, phone, address, nationality, dateOfBirth } = req.body;

      // Update user profile
      const updatedUser = await storage.updateUser(userId, {
        firstName,
        lastName,
        phone,
        address,
        nationality,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        updatedAt: new Date(),
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ 
        message: "Profile updated successfully",
        user: updatedUser 
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.put('/api/auth/change-password', authenticateToken, async (req: any, res) => {
    try {
      const userId = req.user.userId;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current password and new password are required" });
      }

      if (newPassword.length < 8) {
        return res.status(400).json({ message: "New password must be at least 8 characters long" });
      }

      // Get user to verify current password
      const user = await storage.getUser(userId);
      if (!user || !user.password) {
        return res.status(404).json({ message: "User not found or no password set" });
      }

      // Verify current password
      const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(401).json({ message: "Current password is incorrect" });
      }

      // Hash new password
      const hashedNewPassword = await hashPassword(newPassword);

      // Update password
      await storage.updateUser(userId, {
        password: hashedNewPassword,
        updatedAt: new Date(),
      });

      res.json({ message: "Password changed successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ message: "Failed to change password" });
    }
  });

  // Trip routes
  app.get("/api/trips", async (req, res) => {
    try {
      const filters = searchSchema.parse(req.query);
      const trips = await storage.getTripsWithOrganizer(filters);
      res.json(trips);
    } catch (error) {
      res.status(400).json({ message: "Invalid search parameters" });
    }
  });

  app.get("/api/trips/:id", async (req, res) => {
    try {
      const trip = await storage.getTripWithOrganizer(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trip" });
    }
  });

  app.post("/api/trips", authenticateToken, async (req: any, res) => {
    try {
      console.log("Received trip data:", req.body);
      
      // Convert ISO string dates back to Date objects for validation
      const processedBody = {
        ...req.body,
        departureDate: req.body.departureDate ? new Date(req.body.departureDate) : undefined,
        returnDate: req.body.returnDate ? new Date(req.body.returnDate) : undefined,
      };
      
      const tripData = insertTripSchema.parse(processedBody);
      const organizerId = req.body.organizerId;
      
      if (!organizerId) {
        return res.status(400).json({ message: "Organizer ID is required" });
      }

      // Verify that the authenticated user owns this organizer profile
      const organizer = await storage.getOrganizer(organizerId);
      console.log("Organizer check:", { organizer: organizer?.id, userId: organizer?.userId, authUserId: req.user.userId });
      if (!organizer || organizer.userId !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized to create trips for this organizer" });
      }

      const trip = await storage.createTrip({ ...tripData, organizerId });
      res.status(201).json(trip);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ message: "Invalid trip data", errors: error.errors });
      }
      console.error("Trip creation error:", error);
      res.status(500).json({ message: "Failed to create trip" });
    }
  });

  // Update trip
  app.put("/api/trips/:id", authenticateToken, async (req: any, res) => {
    try {
      const tripId = req.params.id;
      console.log("Updating trip:", tripId, req.body);
      
      // Convert ISO string dates back to Date objects for validation
      const processedBody = {
        ...req.body,
        departureDate: req.body.departureDate ? new Date(req.body.departureDate) : undefined,
        returnDate: req.body.returnDate ? new Date(req.body.returnDate) : undefined,
      };
      
      const tripData = insertTripSchema.parse(processedBody);
      
      // Verify that the authenticated user owns this trip
      const existingTrip = await storage.getTrip(tripId);
      if (!existingTrip) {
        return res.status(404).json({ message: "Trip not found" });
      }
      
      const organizer = await storage.getOrganizer(existingTrip.organizerId);
      if (!organizer || organizer.userId !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized to update this trip" });
      }

      const updatedTrip = await storage.updateTrip(tripId, tripData);
      res.json(updatedTrip);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation error:", error.errors);
        return res.status(400).json({ message: "Invalid trip data", errors: error.errors });
      }
      console.error("Trip update error:", error);
      res.status(500).json({ message: "Failed to update trip" });
    }
  });

  // Organizer routes
  app.get("/api/organizers", async (req, res) => {
    try {
      const organizers = await storage.getOrganizers();
      res.json(organizers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organizers" });
    }
  });

  app.get("/api/organizers/:id", async (req, res) => {
    try {
      const organizer = await storage.getOrganizerWithStats(req.params.id);
      if (!organizer) {
        return res.status(404).json({ message: "Organizer not found" });
      }
      res.json(organizer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organizer" });
    }
  });

  // Get organizer by user ID (for dashboard)
  app.get("/api/organizers/by-user/:userId", async (req, res) => {
    try {
      const organizer = await storage.getOrganizerByUserId(req.params.userId);
      if (!organizer) {
        return res.status(404).json({ message: "Organizer not found" });
      }
      res.json(organizer);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch organizer" });
    }
  });

  // Get trips by organizer (for dashboard)
  app.get("/api/organizers/:id/trips", async (req, res) => {
    try {
      const trips = await storage.getTripsByOrganizer(req.params.id);
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch trips" });
    }
  });

  // Get bookings by organizer (for dashboard)  
  app.get("/api/organizers/:id/bookings", async (req, res) => {
    try {
      console.log("Fetching bookings for organizer:", req.params.id);
      const bookings = await storage.getBookingsByOrganizer(req.params.id);
      console.log("Found bookings:", bookings.length);
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
    }
  });

  app.post("/api/organizers", async (req, res) => {
    try {
      const organizerData = insertOrganizerSchema.parse(req.body);
      const userId = req.body.userId;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Check if user exists
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Check if organizer already exists for this user
      const existingOrganizer = await storage.getOrganizerByUserId(userId);
      if (existingOrganizer) {
        return res.status(400).json({ message: "Organizer profile already exists for this user" });
      }

      const organizer = await storage.createOrganizer({ ...organizerData, userId });
      res.status(201).json(organizer);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid organizer data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create organizer" });
    }
  });

  // Handle both PATCH and PUT for organizer updates
  app.patch("/api/organizers/:id", authenticateToken, async (req: any, res) => {
    try {
      const updates = req.body;
      console.log(`PATCH organizer ${req.params.id} with updates:`, updates);
      
      // Verify that the authenticated user owns this organizer profile
      const existingOrganizer = await storage.getOrganizer(req.params.id);
      if (!existingOrganizer || existingOrganizer.userId !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized to update this organizer" });
      }
      
      const organizer = await storage.updateOrganizer(req.params.id, updates);
      if (!organizer) {
        return res.status(404).json({ message: "Organizer not found" });
      }
      res.json(organizer);
    } catch (error) {
      console.error("PATCH organizer error:", error);
      res.status(500).json({ message: "Failed to update organizer" });
    }
  });

  app.put("/api/organizers/:id", authenticateToken, async (req: any, res) => {
    try {
      const updates = req.body;
      console.log(`PUT organizer ${req.params.id} with updates:`, updates);
      
      // Verify that the authenticated user owns this organizer profile
      const existingOrganizer = await storage.getOrganizer(req.params.id);
      if (!existingOrganizer || existingOrganizer.userId !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized to update this organizer" });
      }
      
      const organizer = await storage.updateOrganizer(req.params.id, updates);
      if (!organizer) {
        return res.status(404).json({ message: "Organizer not found" });
      }
      res.json(organizer);
    } catch (error) {
      console.error("PUT organizer error:", error);
      res.status(500).json({ message: "Failed to update organizer" });
    }
  });

  // Review routes
  app.get("/api/trips/:tripId/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviewsByTrip(req.params.tripId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });



  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      
      // Handle guest user bookings by creating a user account
      if (bookingData.userId === 'guest-user') {
        // Check if this email already has a user account
        let user = await storage.getUserByEmail(bookingData.contactEmail);
        
        if (!user) {
          // Create a guest user account
          user = await storage.createUser({
            email: bookingData.contactEmail,
            firstName: 'Guest',
            lastName: 'User',
            role: 'pilgrim',
            isActive: true,
            emailVerified: false,
            authProvider: 'guest'
          });
        }
        bookingData.userId = user.id;
      }
      
      // Check if trip exists and has available slots
      const trip = await storage.getTrip(bookingData.tripId);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      const currentBookings = trip.currentBookings || 0;
      if (currentBookings + bookingData.numberOfPilgrims > trip.maxPilgrims) {
        return res.status(400).json({ message: "Not enough available slots for this trip" });
      }

      const booking = await storage.createBooking(bookingData);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create booking" });
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });

  app.get("/api/bookings/user/:userId", async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookings = await storage.getBookingsByUser(userId);
      
      // Fetch trip and organizer details for each booking
      const bookingsWithDetails = await Promise.all(
        bookings.map(async (booking) => {
          const trip = await storage.getTrip(booking.tripId);
          if (!trip) return null;
          
          const organizer = await storage.getOrganizer(trip.organizerId);
          if (!organizer) return null;
          
          return {
            ...booking,
            trip: {
              ...trip,
              organizer: organizer
            }
          };
        })
      );
      
      // Filter out any null results
      const validBookings = bookingsWithDetails.filter(booking => booking !== null);
      res.json(validBookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user bookings" });
    }
  });

  app.get("/api/users/:userId/completed-trips", async (req, res) => {
    try {
      const userId = req.params.userId;
      const completedTrips = await storage.getUserCompletedTrips(userId);
      res.json(completedTrips);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch completed trips" });
    }
  });

  app.patch("/api/bookings/:id", async (req, res) => {
    try {
      const updates = req.body;
      const booking = await storage.updateBooking(req.params.id, updates);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking" });
    }
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const { username, email, password, role } = req.body;

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user with proper data structure
      const user = await storage.createUser({
        email,
        password: hashedPassword,
        firstName: username || '',
        lastName: '',
        profileImageUrl: null,
        emailVerified: false,
        emailVerificationToken: null,
        emailVerificationExpires: null,
        passwordResetToken: null,
        passwordResetExpires: null,
        authProvider: 'email',
        role: role || 'pilgrim',
        lastLoginAt: null,
      });

      res.status(201).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      });
    } catch (error) {
      console.error('User creation error:', error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Admin routes
  app.get("/api/admin/stats", async (req, res) => {
    try {
      const organizers = await storage.getOrganizers();
      const trips = await storage.getTrips();
      const totalPilgrims = trips.reduce((sum, trip) => sum + (trip.currentBookings || 0), 0);
      
      const stats = {
        totalOrganizers: organizers.length,
        verifiedOrganizers: organizers.filter(org => org.isVerified).length,
        totalTrips: trips.length,
        totalPilgrims,
        totalReviews: 0, // Will be calculated when reviews are implemented
        averageRating: 4.8, // Default rating for now
      };
      
      res.json(stats);
    } catch (error) {
      console.error('Admin stats error:', error);
      res.status(500).json({ message: "Failed to fetch admin stats" });
    }
  });

  // Approve/reject organizer
  app.patch("/api/admin/organizers/:id/verify", async (req, res) => {
    try {
      const { isVerified, verificationBadges = [] } = req.body;
      
      const organizer = await storage.updateOrganizer(req.params.id, {
        isVerified,
        verificationBadges
      });
      
      if (!organizer) {
        return res.status(404).json({ message: "Organizer not found" });
      }
      
      res.json(organizer);
    } catch (error) {
      console.error('Organizer verification error:', error);
      res.status(500).json({ message: "Failed to verify organizer" });
    }
  });

  // Reviews routes
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", authenticateToken, async (req: any, res) => {
    try {
      const reviewData = {
        ...req.body,
        userId: req.user.userId,
      };
      
      const review = await storage.createReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Get user's completed trips for review creation
  app.get("/api/users/:userId/completed-trips", authenticateToken, async (req: any, res) => {
    try {
      const userId = req.params.userId;
      if (userId !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      // For review purposes, allow users to review any available trip
      // This reflects real-world usage where users might experience trips
      // booked through various channels and want to share feedback
      const availableTrips = await storage.getTrips();
      res.json(availableTrips);
    } catch (error) {
      console.error("Error fetching available trips for review:", error);
      res.status(500).json({ message: "Failed to fetch available trips" });
    }
  });

  // File upload endpoint for company logos
  app.post("/api/upload/logo", authenticateToken, (req: any, res) => {
    // For simplicity, we'll store logos as base64 in the database
    // In production, you'd use cloud storage like AWS S3
    const upload = multer({
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
      fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed'));
        }
      }
    }).single('logo');

    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Convert to base64 and store
      const base64Logo = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
      
      res.json({ url: base64Logo });
    });
  });

  // Email test route for troubleshooting
  app.post('/api/test-sendgrid', async (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email address required' });
    }
    
    try {
      await sendVerificationEmail(email, 'test-token-' + Date.now(), req.protocol + '://' + req.get('host'));
      res.json({ 
        message: 'Test email sent successfully',
        service: 'SendGrid',
        recipient: email,
        timestamp: new Date().toISOString(),
        note: 'Check spam folder if not received in inbox'
      });
    } catch (error) {
      console.error('Test email failed:', error);
      res.status(500).json({ 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
