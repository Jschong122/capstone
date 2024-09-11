import axios from "axios";
import { getSession } from "next-auth/react";

const BackEndUrl = axios.create({
  baseURL: "http://localhost:5000",
});

BackEndUrl.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.user.id) {
    config.headers.Authorization = `Bearer ${session.user.id}`;
  }
  return config;
});

export default BackEndUrl;
