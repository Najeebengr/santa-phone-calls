import * as z from "zod"; // Get today's date in YYYY-MM-DD format

export const step1Schema = z.object({
  id: z.string(),
    childName: z
    .string()
    .min(1, "Child's name is required")
    .refine((name) => !/^\d/.test(name), {
      message: "Child's name should not start with a number",
    }),
  parentEmail: z.string().email("Invalid email address"),
  parentNumber: z.string().min(10, "Phone number must be at least 10 characters").regex(
    /^\+?[1-9]\d{1,14}$/, "Phone number must contain only numbers"),
});

export const childSchema = z.object({
    name: z
      .string()
      .min(1, "Child's name is required")
      .refine((name) => !/^\d/.test(name), {
        message: "Child's name should not start with a number",
      }),
    gender: z.enum(["Male", "Female"], { required_error: "Gender is required" }),
    age: z
      .number()
      .int()
      .min(1, "Age must be at least 1")
      .max(18, "Age must be 18 or less"),
    connections: z
      .string()
      .min(1, 'Tell Us About Family Social Connections'),
    details: z
      .string().min(1, 'Tell Us Your Wishes'),
    hobbies: z
      .string().min(1, 'Tell Us About Your Hobbies'),
  });

export const step2Schema = z.object({
    children: z
      .array(childSchema)
      .min(1, "At least one child is required")
      .max(5, "Maximum of 5 children allowed"),
    callType: z.enum(["Immediate", "Scheduled"], { required_error: "Call type is required" }),
    scheduledDate: z
    .string()
    .nullable() // Allows the field to be empty or undefined
    ,
  scheduledTime: z
    .string()
    .nullable(), // Default to a random valid time
    
    recipientName: z
    .string()
    .optional() // Allows the field to be empty or undefined
    .refine(
      (val) => !val || val.trim().length > 0, // Ensure it's either empty or a non-empty string
      { message: "Recipient name must be valid if provided" }
    )
    .transform((val) => (val ? val.trim() : val)), // Trim if not empty
    recipientPhone: z
  .string()
  .optional() // Allows the field to be empty or undefined
  .refine(
    (val) => !val || /^\+?[1-9]\d{9,14}$/.test(val), // Ensure it's either empty or a valid phone number with at least 10 digits
    { message: "Invalid phone number format. Must be at least 10 digits." }
  )
  .transform((val) => (val ? val.trim() : val)), // Trim if not empty
});