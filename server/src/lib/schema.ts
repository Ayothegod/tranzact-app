import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(24, { message: "Username is too long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be up to 6 characters" }),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be up to 6 characters" }),
});

const transactionType = z.enum(["INCOME", "EXPENSE"], {
  message: "transaction type must be INCOME or EXPENSE",
});

export const transactionSchema = z.object({
  transactionType: transactionType,
  description: z.string().optional(),
  amount: z.number().min(1, "amount is too short"),
  category: z.string().min(1, "category is too short"),
  date: z.coerce.date(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "category is too short"),
});

// bio
// phone number
// home address


// Financial Information
// Income Details
// Monthly Income
// Income Sources

// Expenditure Details
// Monthly Rent/Mortgage
// Utility Bills
// Other Recurring Expenses


// Employment Details
// Occupation
// Company Name
// Job Title
// Years of Experience


// Security and Preferences
// Username
// Password
// Two-Factor Authentication (2FA) Setup
// Security Questions
// Notification Preferences
// Email Notifications
// SMS Notifications
// Push Notifications


// Goals and Preferences
// Financial Goals
// Short-term Goals
// Long-term Goals
// Risk Tolerance
// Preferred Investment Types