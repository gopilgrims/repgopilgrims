import {
  users, trips, organizers, reviews, bookings, sessions,
  type User, type UpsertUser, type InsertUser,
  type Trip, type InsertTrip, type TripWithOrganizer,
  type Organizer, type InsertOrganizer,
  type Review, type InsertReview,
  type Booking, type InsertBooking,
  type OrganizerWithStats
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, ilike, and, gte, lte, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByPasswordResetToken(token: string): Promise<User | undefined>;
  getUserByEmailVerificationToken(token: string): Promise<User | undefined>;
  createUser(userData: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Organizer methods
  getOrganizer(id: string): Promise<Organizer | undefined>;
  getOrganizerByUserId(userId: string): Promise<Organizer | undefined>;
  createOrganizer(organizer: InsertOrganizer & { userId: string }): Promise<Organizer>;
  updateOrganizer(id: string, updates: Partial<Organizer>): Promise<Organizer | undefined>;
  getOrganizers(): Promise<Organizer[]>;
  getOrganizerWithStats(id: string): Promise<OrganizerWithStats | undefined>;
  
  // Trip methods
  getTrip(id: string): Promise<Trip | undefined>;
  getTripWithOrganizer(id: string): Promise<TripWithOrganizer | undefined>;
  createTrip(trip: InsertTrip & { organizerId: string }): Promise<Trip>;
  updateTrip(id: string, updates: Partial<Trip>): Promise<Trip | undefined>;
  getTrips(filters?: {
    destination?: string;
    departureDate?: string;
    maxPilgrims?: number;
    maxPrice?: number;
    tags?: string[];
  }): Promise<Trip[]>;
  getTripsWithOrganizer(filters?: {
    destination?: string;
    departureDate?: string;
    maxPilgrims?: number;
    maxPrice?: number;
    tags?: string[];
  }): Promise<TripWithOrganizer[]>;
  getTripsByOrganizer(organizerId: string): Promise<Trip[]>;
  
  // Review methods
  getReview(id: string): Promise<Review | undefined>;
  getReviews(): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  getReviewsByTrip(tripId: string): Promise<Review[]>;
  getReviewsByOrganizer(organizerId: string): Promise<Review[]>;
  getReviewsByUser(userId: string): Promise<Review[]>;
  getUserCompletedTrips(userId: string): Promise<Trip[]>;
  
  // Booking methods
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsByUser(userId: string): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined>;
  getBookingsByTrip(tripId: string): Promise<Booking[]>;
  getBookingsByOrganizer(organizerId: string): Promise<Booking[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private organizers: Map<string, Organizer>;
  private trips: Map<string, Trip>;
  private reviews: Map<string, Review>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.organizers = new Map();
    this.trips = new Map();
    this.reviews = new Map();
    this.bookings = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Create sample admin user
    const adminUser: User = {
      id: "admin-1",
      username: "admin",
      email: "admin@pilgrimageconnect.com",
      password: "admin123",
      role: "admin",
      createdAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Create sample organizers
    const organizer1User: User = {
      id: "user-org-1",
      username: "sacredjourneys",
      email: "contact@sacredjourneys.com",
      password: "password123",
      role: "organizer",
      createdAt: new Date(),
    };
    this.users.set(organizer1User.id, organizer1User);

    const organizer1: Organizer = {
      id: "org-1",
      userId: organizer1User.id,
      companyName: "Sacred Journeys Tours",
      description: "Premier pilgrimage organizer with 15 years of experience in Hajj and Umrah packages",
      yearsExperience: 15,
      isVerified: true,
      verificationBadges: ["religious_authority", "travel_license", "safety_certified"],
      contactEmail: "contact@sacredjourneys.com",
      contactPhone: "+1-555-0123",
      website: "https://sacredjourneys.com",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      satisfactionRate: 98,
      totalTrips: 45,
      createdAt: new Date(),
    };
    this.organizers.set(organizer1.id, organizer1);

    const organizer2User: User = {
      id: "user-org-2",
      username: "blessedpath",
      email: "info@blessedpath.com",
      password: "password123",
      role: "organizer",
      createdAt: new Date(),
    };
    this.users.set(organizer2User.id, organizer2User);

    const organizer2: Organizer = {
      id: "org-2",
      userId: organizer2User.id,
      companyName: "Blessed Path Pilgrimages",
      description: "Affordable and authentic pilgrimage experiences with focus on spiritual guidance",
      yearsExperience: 12,
      isVerified: true,
      verificationBadges: ["travel_license", "safety_certified"],
      contactEmail: "info@blessedpath.com",
      contactPhone: "+1-555-0124",
      website: "https://blessedpath.com",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      satisfactionRate: 96,
      totalTrips: 32,
      createdAt: new Date(),
    };
    this.organizers.set(organizer2.id, organizer2);

    const organizer3User: User = {
      id: "user-org-3",
      username: "heritagepilgrim",
      email: "tours@heritagepilgrim.com",
      password: "password123",
      role: "organizer",
      createdAt: new Date(),
    };
    this.users.set(organizer3User.id, organizer3User);

    const organizer3: Organizer = {
      id: "org-3",
      userId: organizer3User.id,
      companyName: "Heritage Pilgrim Tours",
      description: "Specializing in Iraq and Iran ziyarat packages with expert historical and religious guidance",
      yearsExperience: 20,
      isVerified: true,
      verificationBadges: ["religious_authority", "travel_license", "safety_certified", "historical_expert"],
      contactEmail: "tours@heritagepilgrim.com",
      contactPhone: "+1-555-0125",
      website: "https://heritagepilgrim.com",
      profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      satisfactionRate: 99,
      totalTrips: 67,
      createdAt: new Date(),
    };
    this.organizers.set(organizer3.id, organizer3);

    // Create sample trips
    const trip1: Trip = {
      id: "trip-1",
      organizerId: "org-1",
      title: "Premium Umrah Package - 14 Days",
      description: "5-star accommodation near Haram, guided tours, all meals included. Experience the spiritual journey with comfort and convenience.",
      destination: "Mecca (Hajj/Umrah)",
      departureDate: new Date("2024-03-15"),
      returnDate: new Date("2024-03-28"),
      maxPilgrims: 25,
      currentBookings: 18,
      pricePerPerson: 3200,
      accommodation: "5-star hotels in Mecca & Medina",
      accommodationStars: 5,
      includesFlights: true,
      includesMeals: true,
      includesTransport: true,
      includesGuide: true,
      itinerary: [
        { day: 1, activities: ["Arrival in Jeddah", "Transfer to Mecca", "Hotel check-in", "Orientation session"] },
        { day: 2, activities: ["First Umrah", "Tawaf and Sa'i", "Spiritual guidance session"] },
        { day: 3, activities: ["Visit to Masjid al-Haram", "Optional shopping", "Group prayers"] }
      ],
      images: ["https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&h=500&fit=crop"],
      tags: ["Premium", "Verified"],
      isActive: true,
      createdAt: new Date(),
    };
    this.trips.set(trip1.id, trip1);

    const trip2: Trip = {
      id: "trip-2",
      organizerId: "org-2",
      title: "Complete Hajj Package - 21 Days",
      description: "Essential Hajj experience with comfortable accommodation and experienced religious guidance throughout the journey.",
      destination: "Mecca (Hajj/Umrah)",
      departureDate: new Date("2024-06-10"),
      returnDate: new Date("2024-06-30"),
      maxPilgrims: 40,
      currentBookings: 12,
      pricePerPerson: 4800,
      accommodation: "3-star hotels near Haram",
      accommodationStars: 3,
      includesFlights: true,
      includesMeals: true,
      includesTransport: true,
      includesGuide: true,
      itinerary: [
        { day: 1, activities: ["Arrival and orientation"] },
        { day: 2, activities: ["Ihram and Talbiyah"] },
        { day: 3, activities: ["Tawaf al-Qudum"] }
      ],
      images: ["https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=500&fit=crop"],
      tags: ["Budget-Friendly", "Verified"],
      isActive: true,
      createdAt: new Date(),
    };
    this.trips.set(trip2.id, trip2);

    const trip3: Trip = {
      id: "trip-3",
      organizerId: "org-3",
      title: "Iraq Ziyarat Package - 10 Days",
      description: "Visit Karbala, Najaf, Baghdad, and other sacred Shia sites with expert historical and religious guides.",
      destination: "Iraq (Karbala & Najaf)",
      departureDate: new Date("2024-04-05"),
      returnDate: new Date("2024-04-14"),
      maxPilgrims: 20,
      currentBookings: 8,
      pricePerPerson: 2400,
      accommodation: "4-star hotels near shrines",
      accommodationStars: 4,
      includesFlights: true,
      includesMeals: true,
      includesTransport: true,
      includesGuide: true,
      itinerary: [
        { day: 1, activities: ["Arrival in Baghdad", "Airport transfer", "Hotel check-in"] },
        { day: 2, activities: ["Ziyarat to Imam Ali (AS) shrine in Najaf", "Evening prayers"] },
        { day: 3, activities: ["Ziyarat to Imam Hussain (AS) shrine in Karbala", "Wadi al-Salaam cemetery visit"] }
      ],
      images: ["https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=500&fit=crop"],
      tags: ["Ziyarat", "Verified"],
      isActive: true,
      createdAt: new Date(),
    };
    this.trips.set(trip3.id, trip3);

    // Create sample reviews
    const review1: Review = {
      id: "review-1",
      tripId: "trip-1",
      userId: "user-1",
      organizerId: "org-1",
      rating: 5,
      title: "Exceptional Experience",
      comment: "The verification system gave me complete confidence in choosing my organizer. The trip exceeded all expectations, and every detail was perfectly arranged.",
      isVerified: true,
      createdAt: new Date("2024-01-15"),
    };
    this.reviews.set(review1.id, review1);

    const review2: Review = {
      id: "review-2",
      tripId: "trip-2",
      userId: "user-2",
      organizerId: "org-2",
      rating: 5,
      title: "Life-Changing Journey",
      comment: "Being able to compare packages side-by-side and read honest reviews made all the difference. My Hajj journey was spiritually enriching and worry-free.",
      isVerified: true,
      createdAt: new Date("2024-01-20"),
    };
    this.reviews.set(review2.id, review2);

    const review3: Review = {
      id: "review-3",
      tripId: "trip-3",
      userId: "user-3",
      organizerId: "org-3",
      rating: 5,
      title: "Perfect Organization",
      comment: "The platform's transparency and the organizer's verified credentials gave me peace of mind. The Iraq ziyarat was perfectly organized and deeply meaningful.",
      isVerified: true,
      createdAt: new Date("2024-01-25"),
    };
    this.reviews.set(review3.id, review3);
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByPasswordResetToken(token: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.passwordResetToken === token);
  }

  async getUserByEmailVerificationToken(token: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.emailVerificationToken === token);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingUser = Array.from(this.users.values()).find(user => user.id === userData.id);
    if (existingUser) {
      return this.updateUser(userData.id, userData);
    } else {
      return this.createUser(userData as any);
    }
  }

  // Organizer methods
  async getOrganizer(id: string): Promise<Organizer | undefined> {
    return this.organizers.get(id);
  }

  async getOrganizerByUserId(userId: string): Promise<Organizer | undefined> {
    return Array.from(this.organizers.values()).find(org => org.userId === userId);
  }

  async createOrganizer(organizer: InsertOrganizer & { userId: string }): Promise<Organizer> {
    const id = randomUUID();
    const newOrganizer: Organizer = {
      ...organizer,
      id,
      isVerified: false,
      verificationBadges: [],
      satisfactionRate: 0,
      totalTrips: 0,
      createdAt: new Date(),
    };
    this.organizers.set(id, newOrganizer);
    return newOrganizer;
  }

  async updateOrganizer(id: string, updates: Partial<Organizer>): Promise<Organizer | undefined> {
    const organizer = this.organizers.get(id);
    if (!organizer) return undefined;
    
    const updated = { ...organizer, ...updates };
    this.organizers.set(id, updated);
    return updated;
  }

  async getOrganizers(): Promise<Organizer[]> {
    return Array.from(this.organizers.values());
  }

  async getOrganizerWithStats(id: string): Promise<OrganizerWithStats | undefined> {
    const organizer = this.organizers.get(id);
    if (!organizer) return undefined;

    const trips = Array.from(this.trips.values()).filter(trip => trip.organizerId === id);
    const reviews = Array.from(this.reviews.values()).filter(review => review.organizerId === id);
    
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      ...organizer,
      trips,
      reviews,
      averageRating,
    };
  }

  // Trip methods
  async getTrip(id: string): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async getTripWithOrganizer(id: string): Promise<TripWithOrganizer | undefined> {
    const trip = this.trips.get(id);
    if (!trip) return undefined;

    const organizer = this.organizers.get(trip.organizerId);
    if (!organizer) return undefined;

    const reviews = Array.from(this.reviews.values()).filter(review => review.tripId === id);
    const averageRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
      : 0;

    return {
      ...trip,
      organizer,
      reviews,
      averageRating,
      totalReviews: reviews.length,
    };
  }

  async createTrip(trip: InsertTrip & { organizerId: string }): Promise<Trip> {
    const id = randomUUID();
    const newTrip: Trip = {
      ...trip,
      id,
      currentBookings: 0,
      isActive: true,
      createdAt: new Date(),
    };
    this.trips.set(id, newTrip);
    return newTrip;
  }

  async updateTrip(id: string, tripData: Partial<InsertTrip>): Promise<Trip> {
    const existingTrip = this.trips.get(id);
    if (!existingTrip) {
      throw new Error("Trip not found");
    }
    
    const updatedTrip: Trip = {
      ...existingTrip,
      ...tripData,
    };
    
    this.trips.set(id, updatedTrip);
    return updatedTrip;
  }

  async updateTrip(id: string, updates: Partial<Trip>): Promise<Trip | undefined> {
    const trip = this.trips.get(id);
    if (!trip) return undefined;
    
    const updated = { ...trip, ...updates };
    this.trips.set(id, updated);
    return updated;
  }

  async getTrips(filters?: {
    destination?: string;
    departureDate?: string;
    maxPilgrims?: number;
    maxPrice?: number;
    tags?: string[];
  }): Promise<Trip[]> {
    let trips = Array.from(this.trips.values()).filter(trip => trip.isActive);

    if (filters) {
      if (filters.destination) {
        trips = trips.filter(trip => 
          trip.destination.toLowerCase().includes(filters.destination!.toLowerCase())
        );
      }
      if (filters.maxPrice) {
        trips = trips.filter(trip => trip.pricePerPerson <= filters.maxPrice!);
      }
      if (filters.tags?.length) {
        trips = trips.filter(trip => 
          filters.tags!.some(tag => 
            (trip.tags as string[]).includes(tag)
          )
        );
      }
    }

    return trips;
  }

  async getTripsWithOrganizer(filters?: {
    destination?: string;
    departureDate?: string;
    maxPilgrims?: number;
    maxPrice?: number;
    tags?: string[];
  }): Promise<TripWithOrganizer[]> {
    const trips = await this.getTrips(filters);
    const tripsWithOrganizer: TripWithOrganizer[] = [];

    for (const trip of trips) {
      const organizer = this.organizers.get(trip.organizerId);
      if (organizer) {
        const reviews = Array.from(this.reviews.values()).filter(review => review.tripId === trip.id);
        const averageRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
          : 0;

        tripsWithOrganizer.push({
          ...trip,
          organizer,
          reviews,
          averageRating,
          totalReviews: reviews.length,
        });
      }
    }

    return tripsWithOrganizer;
  }

  async getTripsByOrganizer(organizerId: string): Promise<Trip[]> {
    return Array.from(this.trips.values()).filter(trip => trip.organizerId === organizerId);
  }

  // Review methods
  async getReview(id: string): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values());
  }

  async getUserCompletedTrips(userId: string): Promise<Trip[]> {
    // Get trips where user has bookings with completed/confirmed status and past return date
    const userBookings = Array.from(this.bookings.values()).filter(booking => 
      booking.userId === userId && 
      (booking.status === "completed" || booking.status === "confirmed")
    );
    
    const completedTrips = userBookings
      .map(booking => this.trips.get(booking.tripId))
      .filter((trip): trip is Trip => {
        if (!trip) return false;
        // Only include trips that have ended (return date is in the past)
        return new Date(trip.returnDate) < new Date();
      });
    
    return completedTrips;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const id = randomUUID();
    const newReview: Review = {
      ...review,
      id,
      isVerified: false,
      createdAt: new Date(),
    };
    this.reviews.set(id, newReview);
    return newReview;
  }

  async getReviewsByTrip(tripId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.tripId === tripId);
  }

  async getReviewsByOrganizer(organizerId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.organizerId === organizerId);
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.userId === userId);
  }

  // Booking methods
  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const newBooking: Booking = {
      ...booking,
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.bookings.set(id, newBooking);

    // Update trip current bookings
    const trip = this.trips.get(booking.tripId);
    if (trip) {
      const currentBookings = trip.currentBookings || 0;
      const updated = { 
        ...trip, 
        currentBookings: currentBookings + booking.numberOfPilgrims 
      };
      this.trips.set(trip.id, updated);
    }

    return newBooking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updated = { ...booking, ...updates };
    this.bookings.set(id, updated);
    return updated;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async getBookingsByTrip(tripId: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.tripId === tripId);
  }

  async getBookingsByOrganizer(organizerId: string): Promise<Booking[]> {
    const organizer = this.organizers.get(organizerId);
    if (!organizer) return [];

    const organizerTrips = Array.from(this.trips.values()).filter(trip => trip.organizerId === organizerId);
    const tripIds = organizerTrips.map(trip => trip.id);
    
    return Array.from(this.bookings.values()).filter(booking => tripIds.includes(booking.tripId));
  }
}

import { DatabaseStorage } from "./database-storage";

export const storage = new DatabaseStorage();
