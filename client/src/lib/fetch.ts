import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

export const BASEURL = import.meta.env.BASE_URL

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
