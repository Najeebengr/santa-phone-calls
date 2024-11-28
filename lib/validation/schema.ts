// types.ts
export interface Child {
  id: string;
  name: string;
  gender: "Male" | "Female";
  age: number;
  connections: string;
  details: string;
  hobbies: string;
}

export interface CheckoutData {
  id: string;
  price: number;
  planName: string;
  selectedSlot: string;
  selectedTimezone: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  children: Child[];
  callNow: boolean;
  when: number | null;
  recipientName?: string;
  recipientPhone?: string;
}

// schema.ts
import * as z from "zod";

export const childSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, "Child's name is required")
    .refine((name) => !/^\d/.test(name), {
      message: "Child's name should not start with a number",
    }),
  gender: z.enum(["Male", "Female"]),
  age: z
    .number()
    .int()
    .min(1, "Age must be at least 1")
    .max(18, "Age must be 18 or less"),
  connections: z.string().min(1, "Tell Us About Family Social Connections"),
  details: z.string().min(1, "Tell Us Your Wishes"),
  hobbies: z.string().min(1, "Tell Us About Your Hobbies"),
});

export const step1Schema = z.object({
  id: z.string(),
  parentName: z
    .string()
    .min(1, "Your name is required")
    .refine((name) => !/^\d/.test(name), {
      message: "Your name should not start with a number",
    }),
  parentEmail: z.string().email("Invalid email address"),
  parentPhone: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^\+?[1-9]\d{1,14}$/, "Phone number must contain only numbers"),
});

export const step2Schema = z.object({
  id: z.string(),
  children: z
    .array(childSchema)
    .min(1, "At least one child is required")
    .max(5, "Maximum of 5 children allowed"),
  callType: z.enum(["Immediate", "Scheduled"]),
  scheduledDate: z.string().nullable(),
  scheduledTime: z.string().nullable(),
  recipientName: z
    .string()
    .optional()
    .transform((val) => val?.trim() || undefined),
  recipientPhone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[1-9]\d{9,14}$/.test(val.trim()),
      "Invalid phone number format. Must be at least 10 digits."
    )
    .transform((val) => val?.trim() || undefined),
});

// Helper function to generate unique IDs
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type ChildFormData = z.infer<typeof childSchema>;