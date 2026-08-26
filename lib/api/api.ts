import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000"}/api`
    : "/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
