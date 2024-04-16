import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://localhost:7148/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});
