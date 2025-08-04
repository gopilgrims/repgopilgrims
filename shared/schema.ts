import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  password: varchar("password"), // Only for email/password auth
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  phone: varchar("phone"),
  address: text("address"),
  nationality: varchar("nationality"),
  dateOfBirth: timestamp("date_of_birth"),
  emailVerified: boolean("email_verified").default(false),
  emailVerificationToken: varchar("email_verification_token"),
  emailVerificationExpires: timestamp("email_verification_expires"),
  passwordResetToken: varchar("password_reset_token"),
  passwordResetExpires: timestamp("password_reset_expires"),
  authProvider: varchar("auth_provider").default("email"), // email, google, apple, replit
  authProviderUserId: varchar("auth_provider_user_id"),
  role: varchar("role").default("pilgrim"), // pilgrim, organizer, admin
  isActive: boolean("is_active").default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const organizers = pgTable("organizers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  companyName: text("company_name").notNull(),
  description: text("description"),
  yearsExperience: integer("years_experience").notNull(),
  isVerified: boolean("is_verified").default(false),
  verificationBadges: jsonb("verification_badges").default([]), // array of badge types
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone"),
  businessEmail: text("business_email"),
  businessPhone: text("business_phone"),
  companyLogo: text("company_logo"),
  website: text("website"),
  profileImage: text("profile_image"),
  satisfactionRate: real("satisfaction_rate").default(0),
  totalTrips: integer("total_trips").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trips = pgTable("trips", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizerId: varchar("organizer_id").references(() => organizers.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  destination: text("destination").notNull(),
  departureDate: timestamp("departure_date").notNull(),
  returnDate: timestamp("return_date").notNull(),
  maxPilgrims: integer("max_pilgrims").notNull(),
  currentBookings: integer("current_bookings").default(0),
  pricePerPerson: real("price_per_person").notNull(),
  accommodation: text("accommodation").notNull(),
  accommodationStars: integer("accommodation_stars").notNull(),
  includesFlights: boolean("includes_flights").default(false),
  includesMeals: boolean("includes_meals").default(false),
  includesTransport: boolean("includes_transport").default(false),
  includesGuide: boolean("includes_guide").default(false),
  tripZakirs: integer("trip_zakirs"), // Number of spiritual priests (2-5)
  tripZakirNames: jsonb("trip_zakir_names").default([]), // Array of zakir names
  itinerary: jsonb("itinerary").notNull(), // array of daily activities
  images: jsonb("images").default([]), // array of image URLs
  tags: jsonb("tags").default([]), // Premium, Budget-Friendly, Cultural, etc.
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tripId: varchar("trip_id").references(() => trips.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  organizerId: varchar("organizer_id").references(() => organizers.id).notNull(),
  // Overall rating (1-5 stars)
  rating: integer("rating").notNull(),
  // Detailed ratings for specific aspects (1-5 stars each)
  spiritualGuidanceRating: integer("spiritual_guidance_rating").notNull(),
  spiritualCoverageRating: integer("spiritual_coverage_rating").notNull(),
  accommodationDistanceRating: integer("accommodation_distance_rating").notNull(),
  supportBehaviorRating: integer("support_behavior_rating").notNull(),
  foodQualityRating: integer("food_quality_rating").notNull(),
  hotelQualityRating: integer("hotel_quality_rating").notNull(),
  valueForMoneyRating: integer("value_for_money_rating").notNull(),
  transportationRating: integer("transportation_rating").notNull(),
  proServicesRating: integer("pro_services_rating").notNull(),
  title: text("title").notNull(),
  comment: text("comment").notNull(),
  goodExperience: text("good_experience"), // What went well
  badExperience: text("bad_experience"), // What didn't go well
  isVerified: boolean("is_verified").default(false), // only verified after trip completion
  createdAt: timestamp("created_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  tripId: varchar("trip_id").references(() => trips.id).notNull(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  numberOfPilgrims: integer("number_of_pilgrims").notNull(),
  totalAmount: real("total_amount").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, paid, documents_pending, documents_verified, preparing, ready, in_progress, completed, cancelled_by_pilgrim, cancelled_by_organizer, refunded, no_show
  specialRequests: text("special_requests"),
  contactEmail: text("contact_email").notNull(),
  contactPhone: text("contact_phone").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas for non-auth tables  
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertOrganizerSchema = createInsertSchema(organizers).omit({
  id: true,
  userId: true,
  isVerified: true,
  verificationBadges: true,
  satisfactionRate: true,
  totalTrips: true,
  createdAt: true,
});

export const insertTripSchema = createInsertSchema(trips).omit({
  id: true,
  organizerId: true,
  currentBookings: true,
  isActive: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  isVerified: true,
  createdAt: true,
}).extend({
  // Ensure all detailed ratings are provided and valid (1-5)
  spiritualGuidanceRating: z.number().min(1).max(5),
  spiritualCoverageRating: z.number().min(1).max(5),
  accommodationDistanceRating: z.number().min(1).max(5),
  supportBehaviorRating: z.number().min(1).max(5),
  foodQualityRating: z.number().min(1).max(5),
  hotelQualityRating: z.number().min(1).max(5),
  valueForMoneyRating: z.number().min(1).max(5),
  transportationRating: z.number().min(1).max(5),
  proServicesRating: z.number().min(1).max(5),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Organizer = typeof organizers.$inferSelect;
export type InsertOrganizer = z.infer<typeof insertOrganizerSchema>;

export type Trip = typeof trips.$inferSelect;
export type InsertTrip = z.infer<typeof insertTripSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// Extended types for frontend
export type TripWithOrganizer = Trip & {
  organizer: Organizer;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
};

export type OrganizerWithStats = Organizer & {
  trips: Trip[];
  reviews: Review[];
  averageRating: number;
};
