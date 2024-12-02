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

// type: "income",
// amount: "200",
// description: "type 2",
// categoryName: "null",

export interface TransactionRequest {
  type: "income" | "expense";
  amount: number;
  description?: string;
  categoryName?: string;
}

// export interface SpaceInterface {
//   id: string;
//   status: string;
//   createdAt: Date;
//   updatedAt: string;

//   name: string;
//   participants: UserInterface[];
// }
