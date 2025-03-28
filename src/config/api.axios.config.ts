import { getCookie } from "@/utils/cookie";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_API,
  headers: {
    Authorization: `Bearer ${getCookie(
      `${process.env.NEXT_PUBLIC_COOKIE_NAME}`
    )}`,
  },
});
