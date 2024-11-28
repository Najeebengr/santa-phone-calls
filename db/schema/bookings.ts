import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const bookingsTable = pgTable("bookings", {
  id: integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
  scheduledDate: varchar().notNull(), // Date in YYYY-MM-DD format
  scheduledTime: varchar().notNull(), // Time in HH:mm format
  userId: integer().notNull(), // FK to users table
  createdAt: timestamp().defaultNow(),
});