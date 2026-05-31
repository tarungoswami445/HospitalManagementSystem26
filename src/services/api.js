import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// attach token automatically
api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  // skip auth APIs
  if (token && !config.url.includes("/api/auth")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;

















// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8080",
// });

// api.interceptors.request.use((config) => {

//   const token = localStorage.getItem("token");

//   // ❌ DO NOT send token for login API
//   if (token && !config.url.includes("/auth/login")) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;