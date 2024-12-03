/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { APIStatusResponseInterface, TransactionRequest } from "./types/api";
import { Fetcher } from "swr";

export const BASEURL = import.meta.env.VITE_SERVER_BASEURI;
export type NewAxiosResponse = AxiosResponse<APIStatusResponseInterface, any>;

export function formatAmount(amount: number) {
  return amount.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// january:{
//   Label, color, categoryName
// }

// select data for any month
// 

export function formatPercent(currentAmount: number, targetAmount: number) {
  return (currentAmount / targetAmount) * 100
}

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SERVER_BASEURI,
  timeout: 12000,
});

// const getChats = async () => {
//   const { error, data, isLoading } = await fetcher(
//     async () => await getUserChats()
//   );
// };

export const fetcher: Fetcher<APIStatusResponseInterface, string> = (
  url: any
) => axiosInstance.get(url).then((res) => res.data);

export const createTransaction = (data: TransactionRequest) => {
  return axiosInstance.post("/transactions/transaction", data);
};

export const getAllTransaction = () => {
  return axiosInstance.get("/transactions/transaction");
};

export const getAllGoals = () => {
  return axiosInstance.get("/goals");
};

export const balance = () => {
  return axiosInstance.get("/transactions/balance");
};

export const joinSpace = (spaceId: string, participantId: string) => {
  return axiosInstance.post(`/space/${spaceId}/${participantId}`);
};
