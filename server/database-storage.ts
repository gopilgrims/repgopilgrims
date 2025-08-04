import {
  users, trips, organizers, reviews, bookings,
  type User, type UpsertUser, type InsertUser,
  type Trip, type InsertTrip, type TripWithOrganizer,
  type Organizer, type InsertOrganizer,
  type Review, type InsertReview,
  type Booking, type InsertBooking,
  type OrganizerWithStats
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, and, or, gte, lte, lt, desc, sql, count, inArray } from "drizzle-orm";
import type { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  // User methods - Required for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    // Username is not in the schema, return undefined for now
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async getUserByPasswordResetToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.passwordResetToken, token));
    return user;
  }

  async getUserByEmailVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.emailVerificationToken, token));
    return user;
  }

  // Organizer methods
  async getOrganizer(id: string): Promise<Organizer | undefined> {
    const [organizer] = await db.select().from(organizers).where(eq(organizers.id, id));
    return organizer;
  }

  async getOrganizerByUserId(userId: string): Promise<Organizer | undefined> {
    const [organizer] = await db.select().from(organizers).where(eq(organizers.userId, userId));
    return organizer;
  }

  async createOrganizer(organizer: InsertOrganizer & { userId: string }): Promise<Organizer> {
    const [newOrganizer] = await db.insert(organizers).values(organizer).returning();
    return newOrganizer;
  }

  async updateOrganizer(id: string, updates: Partial<Organizer>): Promise<Organizer | undefined> {
    const [updated] = await db
      .update(organizers)
      .set(updates)
      .where(eq(organizers.id, id))
      .returning();
    return updated;
  }

  async getOrganizers(): Promise<Organizer[]> {
    const organizersData = await db.select().from(organizers);
    const organizersWithStats: Organizer[] = [];

    for (const organizer of organizersData) {
      // Calculate actual total trips
      const organizerTrips = await db.select().from(trips).where(eq(trips.organizerId, organizer.id));
      
      // Calculate satisfaction rate from reviews
      const organizerReviews = await db.select().from(reviews).where(eq(reviews.organizerId, organizer.id));
      const satisfactionRate = organizerReviews.length > 0 
        ? Math.round((organizerReviews.reduce((sum, review) => sum + review.rating, 0) / organizerReviews.length) * 20) // Convert 1-5 scale to percentage
        : 0;

      organizersWithStats.push({
        ...organizer,
        totalTrips: organizerTrips.length,
        satisfactionRate: satisfactionRate,
      });
    }

    return organizersWithStats;
  }

  async getOrganizerWithStats(id: string): Promise<OrganizerWithStats | undefined> {
    const organizer = await this.getOrganizer(id);
    if (!organizer) return undefined;

    const organizerTrips = await db.select().from(trips).where(eq(trips.organizerId, id));
    const organizerReviews = await db.select().from(reviews).where(eq(reviews.organizerId, id));
    
    const averageRating = organizerReviews.length > 0 
      ? organizerReviews.reduce((sum, review) => sum + review.rating, 0) / organizerReviews.length 
      : 0;

    return {
      ...organizer,
      trips: organizerTrips,
      reviews: organizerReviews,
      averageRating,
    };
  }

  // Trip methods
  async getTrip(id: string): Promise<Trip | undefined> {
    const [trip] = await db.select().from(trips).where(eq(trips.id, id));
    return trip;
  }

  async getTripWithOrganizer(id: string): Promise<TripWithOrganizer | undefined> {
    const trip = await this.getTrip(id);
    if (!trip) return undefined;

    const organizer = await this.getOrganizer(trip.organizerId);
    if (!organizer) return undefined;

    // Calculate organizer stats
    const organizerTrips = await db.select().from(trips).where(eq(trips.organizerId, organizer.id));
    const organizerReviews = await db.select().from(reviews).where(eq(reviews.organizerId, organizer.id));
    const satisfactionRate = organizerReviews.length > 0 
      ? Math.round((organizerReviews.reduce((sum, review) => sum + review.rating, 0) / organizerReviews.length) * 20) // Convert 1-5 scale to percentage
      : 0;

    const organizerWithStats = {
      ...organizer,
      totalTrips: organizerTrips.length,
      satisfactionRate: satisfactionRate,
    };

    const tripReviews = await db.select().from(reviews).where(eq(reviews.tripId, id));
    const averageRating = tripReviews.length > 0 
      ? tripReviews.reduce((sum, review) => sum + review.rating, 0) / tripReviews.length 
      : 0;

    return {
      ...trip,
      organizer: organizerWithStats,
      reviews: tripReviews,
      averageRating,
      totalReviews: tripReviews.length,
    };
  }

  async createTrip(trip: InsertTrip & { organizerId: string }): Promise<Trip> {
    const [newTrip] = await db.insert(trips).values(trip).returning();
    return newTrip;
  }

  async updateTrip(id: string, updates: Partial<Trip>): Promise<Trip | undefined> {
    const [updated] = await db
      .update(trips)
      .set(updates)
      .where(eq(trips.id, id))
      .returning();
    return updated;
  }

  async getTrips(filters?: {
    destination?: string;
    departureDate?: string;
    maxPilgrims?: number;
    maxPrice?: number;
    tags?: string[];
  }): Promise<Trip[]> {
    let query = db.select().from(trips).where(eq(trips.isActive, true));
    
    if (filters) {
      const conditions = [eq(trips.isActive, true)];
      
      if (filters.destination) {
        conditions.push(ilike(trips.destination, `%${filters.destination}%`));
      }
      if (filters.maxPrice) {
        conditions.push(lte(trips.pricePerPerson, filters.maxPrice));
      }
      
      query = db.select().from(trips).where(and(...conditions));
    }

    return await query;
  }

  async getTripsWithOrganizer(filters?: {
    destination?: string;
    departureDate?: string;
    maxPilgrims?: number;
    maxPrice?: number;
    tags?: string[];
  }): Promise<TripWithOrganizer[]> {
    const tripsData = await this.getTrips(filters);
    const tripsWithOrganizer: TripWithOrganizer[] = [];

    for (const trip of tripsData) {
      const organizer = await this.getOrganizer(trip.organizerId);
      if (organizer) {
        // Calculate organizer stats
        const organizerTrips = await db.select().from(trips).where(eq(trips.organizerId, organizer.id));
        const organizerReviews = await db.select().from(reviews).where(eq(reviews.organizerId, organizer.id));
        const satisfactionRate = organizerReviews.length > 0 
          ? Math.round((organizerReviews.reduce((sum, review) => sum + review.rating, 0) / organizerReviews.length) * 20) // Convert 1-5 scale to percentage
          : 0;

        const organizerWithStats = {
          ...organizer,
          totalTrips: organizerTrips.length,
          satisfactionRate: satisfactionRate,
        };

        const tripReviews = await db.select().from(reviews).where(eq(reviews.tripId, trip.id));
        const averageRating = tripReviews.length > 0 
          ? tripReviews.reduce((sum, review) => sum + review.rating, 0) / tripReviews.length 
          : 0;

        tripsWithOrganizer.push({
          ...trip,
          organizer: organizerWithStats,
          reviews: tripReviews,
          averageRating,
          totalReviews: tripReviews.length,
        });
      }
    }

    return tripsWithOrganizer;
  }

  async getTripsByOrganizer(organizerId: string): Promise<Trip[]> {
    return await db.select().from(trips).where(eq(trips.organizerId, organizerId));
  }

  // Review methods
  async getReview(id: string): Promise<Review | undefined> {
    const [review] = await db.select().from(reviews).where(eq(reviews.id, id));
    return review;
  }

  async createReview(review: InsertReview): Promise<Review> {
    const [newReview] = await db.insert(reviews).values(review).returning();
    return newReview;
  }

  async getReviewsByTrip(tripId: string): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.tripId, tripId));
  }

  async getReviewsByOrganizer(organizerId: string): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.organizerId, organizerId));
  }

  async getReviewsByUser(userId: string): Promise<Review[]> {
    return await db.select().from(reviews).where(eq(reviews.userId, userId));
  }

  async getReviews(): Promise<Review[]> {
    return await db.select().from(reviews);
  }

  async getUserCompletedTrips(userId: string): Promise<Trip[]> {
    // Get trips where user has bookings with completed or confirmed status
    // and the trip's return date has passed
    const userBookings = await db
      .select({
        trip: trips,
      })
      .from(bookings)
      .innerJoin(trips, eq(bookings.tripId, trips.id))
      .where(
        and(
          eq(bookings.userId, userId),
          or(
            eq(bookings.status, "completed"),
            eq(bookings.status, "confirmed")
          ),
          lt(trips.returnDate, new Date()) // Trip return date is in the past
        )
      );

    return userBookings.map(booking => booking.trip);
  }

  // Booking methods
  async getBooking(id: string): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    
    // Update trip's current bookings count
    await db
      .update(trips)
      .set({ 
        currentBookings: sql`${trips.currentBookings} + ${newBooking.numberOfPilgrims}` 
      })
      .where(eq(trips.id, newBooking.tripId));

    return newBooking;
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | undefined> {
    const [updated] = await db
      .update(bookings)
      .set(updates)
      .where(eq(bookings.id, id))
      .returning();
    return updated;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async getBookingsByTrip(tripId: string): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.tripId, tripId));
  }

  async getBookingsByOrganizer(organizerId: string): Promise<Booking[]> {
    const organizerTrips = await this.getTripsByOrganizer(organizerId);
    const tripIds = organizerTrips.map(trip => trip.id);
    
    if (tripIds.length === 0) return [];
    
    return await db.select().from(bookings).where(inArray(bookings.tripId, tripIds));
  }
}