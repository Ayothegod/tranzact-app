import axios from "axios";
import useSWR from "swr";

export const axiosInstance = axios.create({
  withCredentials: true,
});

export const BASEURL = "http://localhost:3000/api";

// export const fetcher = (url: string) => fetch(url).then((res) => res.json());
export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
// const {
//     data: allTransactions,
//     error: transactionsError,
//     isLoading: transactionsLoading,
//   } = useSWR(`${BASEURL}/all-transactions`, fetcher);

const fetchData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/auth/get-user",
      {
        withCredentials: true,
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
