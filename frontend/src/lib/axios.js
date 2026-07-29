import axios from "axios";

// Helper function to get or generate an anonymous client device ID
const getUserId = () => {
  let userId = localStorage.getItem("thinkboard_user_id");
  if (!userId) {
    userId = "user_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem("thinkboard_user_id", userId);
  }
  return userId;
};

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

// Axios Request Interceptor: Automatically attach the x-user-id header to all outgoing requests
api.interceptors.request.use(
  (config) => {
    config.headers["x-user-id"] = getUserId();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;