import * as z from "zod";

export const step1Schema = z.object({
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
    
    recipientName: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  recipientPhone: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" ? null : val)),
  });
