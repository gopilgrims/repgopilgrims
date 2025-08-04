import { db } from "./db";
import { users } from "@shared/schema";
import type { User } from "@shared/schema";

export async function seedDatabase() {
  console.log("Seeding database with sample data...");

  // Create sample admin user
  const adminUser: User = {
    id: "admin-1",
    email: "admin@gopilgrims.com",
    firstName: "Admin",
    lastName: "User",
    profileImageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await db.insert(users).values(adminUser).onConflictDoNothing();

  console.log("Database seeded successfully!");
}