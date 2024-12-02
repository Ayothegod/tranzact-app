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

export type Goal = {
  id: string;
  name: string;
  description: string | null;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
  userId: string;
};
            {/* <div className="bg-light-bg rounded-md border border-neutral-100 p-2 relative">
              <span className="absolute top-1 right-1 text-xs bg-white p-1 font-bold rounded-md">
                expense
              </span>
              <aside className="p-2 text-white bg-red-500 w-max rounded-full">
                <ArrowDownNarrowWide className="w-5 h-5" />
              </aside>
              <div className="relative">
                <label
                  htmlFor=""
                  className="text-xs font-medium text-neutral-500"
                >
                  From 3 days ago
                </label>
                <p className="font-bold text-xl">$5,200.00</p>
              </div>
            </div> */}