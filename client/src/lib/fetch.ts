/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { APIStatusResponseInterface } from "./types/api";

export const fetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);

export type NewAxiosResponse = AxiosResponse<APIStatusResponseInterface, any>;

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SERVER_BASEURI,
  timeout: 12000,
});


export const createSpace = (name: string) => {
  return axiosInstance.post("/space/", { name });
};

export const joinSpace = (spaceId: string, participantId: string) => {
  return axiosInstance.post(`/space/${spaceId}/${participantId}`);
};
