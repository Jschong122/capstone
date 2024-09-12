import axios from "axios";
import { getSession } from "next-auth/react";

const BackEndUrl = axios.create({
  baseURL: "http://localhost:5000",
});

BackEndUrl.interceptors.request.use(async (config) => {
  const secret = process.env.NEXTAUTH_SECRET;
  if (secret) {
    config.headers.Authorization = `Bearer ${secret}`;
  }
  return config;
});

export default BackEndUrl;
