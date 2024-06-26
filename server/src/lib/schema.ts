import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z
    .string()
    .min(1, { message: "Name is required" })
    .max(24, { message: "Username is too long" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Name is required" }),
  password: z.string(),
});

const transactionType = z.enum(["INCOME", "EXPENSE"], {
  message: "transaction type must be INCOME or EXPENSE",
});

export const transactionSchema = z.object({
  transactionType: transactionType,
  description: z.string().min(1, "description is too short").optional(),
  amount: z.number().min(1, "amount is too short"),
  category: z.string().min(1, "category is too short"),
  userId: z.string().min(1, "userId is too short"),
});

