import {
    integer,
    pgTable,
    timestamp,
    varchar,
  } from "drizzle-orm/pg-core";
  
  export const usersTable = pgTable("users", {
    id: integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
    parentEmail: varchar().unique(),  // Parent's email
    parentNumber: varchar(),          // Parent's phone number
    callType: varchar(),              // Call type: Immediate or Scheduled
    scheduledDate: varchar(),                   // Scheduled call date (stored as string in YYYY-MM-DD)
    scheduledTime: varchar(),                   // Scheduled call time (stored as string in HH:MM)
    recipientName: varchar(),                   // Recipient's name for gift box
    recipientPhone: varchar(),                  // Recipient's phone for gift box
    createdAt: timestamp().defaultNow(),        // Record creation timestamp
    updatedAt: timestamp().defaultNow(), // Record update timestamp
  });

