import axios from "axios";
import useSWR from "swr";

export const axiosInstance = axios.create({
  withCredentials: true,
});


export const BASEURL = "http://localhost:3000/api";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const {
//     data: allTransactions,
//     error: transactionsError,
//     isLoading: transactionsLoading,
//   } = useSWR(`${BASEURL}/all-transactions`, fetcher);
