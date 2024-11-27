import {
    integer,
    pgTable,
    varchar,
    foreignKey,
  } from "drizzle-orm/pg-core";
import { usersTable } from "./user";
  
  export const childrenTable = pgTable("children", {
    id: integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
    userId: integer().references(() => usersTable.id, { onDelete: "cascade" }), // Foreign key to users table
    childName: varchar(),               // Name of the child
    age: integer(),                     // Child's age
    gender: varchar(),                            // Child's gender
    connections: varchar(),                       // Social connections
    details: varchar(),                           // Holiday-specific details
    hobbies: varchar(),                           // Hobbies and interests
  });