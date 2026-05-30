import axios from "axios";
import { fetchNewAccessJWT } from "./userApi";

// ==========================================
// BASE CONFIG
// ==========================================

const apiClient = axios.create({
  baseURL: "http://localhost:4000/v1/",
  timeout: 10000,
});

// ==========================================
// REQUEST INTERCEPTOR
// (Automatically attach token)
// ==========================================

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessJWT");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ==========================================
// RESPONSE INTERCEPTOR
// (Handle token expiry + refresh)
// ==========================================

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401) and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await fetchNewAccessJWT();

        if (res.status === "success") {
          const newToken = sessionStorage.getItem("accessJWT");

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return apiClient(originalRequest);
        }
      } catch (err) {
        console.log("Refresh token failed", err);

        // OPTIONAL: force logout here if refresh fails
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("crmSite");
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
