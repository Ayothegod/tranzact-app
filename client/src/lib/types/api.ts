/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserInterface {
  id: string;
  email: string;
  fullname: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullname: string;
}

export interface APIStatusResponseInterface {
  data: any;
  message: string;
  statusCode: number;
  success?: boolean;
}

export interface TransactionRequest {
  type: "income" | "expense";
  amount: number;
  description?: string;
  categoryName?: string;
}

export type Transaction = {
  id: string;
  type: "income" | "expense";
  description: string | null;
  amount: string;
  createdAt: string;
  updatedAt: string | null;
  categoryId: string;
  category: {
    id: string;
    name: string;
    createdAt: string | null;
    userId: string;
  };
  userId: string;
};