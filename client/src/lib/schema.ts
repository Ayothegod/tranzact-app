import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(1, { message: "Full Name is required" }),
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
  amount: z.coerce.number().min(1, "amount is too short"),
  category: z.string().min(1, "you must pick a category"),
  date: z.coerce.date(),
});

export const categorySchema = z.object({
  name: z.string().min(1, "category is too short"),
})
