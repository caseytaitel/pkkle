import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

/* 🔍 TEMP DEBUG — log outgoing payload */
api.interceptors.request.use((config) => {
  console.log("AXIOS DATA SENT:", JSON.stringify(config.data));
  return config;
});