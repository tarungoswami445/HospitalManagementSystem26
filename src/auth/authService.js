import api from "../services/api";

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/api/auth/login", data);

  // store full session
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("role", res.data.role);
  localStorage.setItem("userId", res.data.userId);
  localStorage.setItem("email", res.data.email);
  localStorage.setItem("fullName", res.data.fullName);

  return res;
};

// REGISTER PATIENT
export const registerPatient = (data) => {
  return api.post("/api/auth/patient-register", data);
};

// REGISTER DOCTOR
export const registerDoctor = (data) => {
  return api.post("/api/auth/doctor-register", data);
};





















// import api from "../services/api";

// export const loginUser = (data) => {
//   return api.post("/api/auth/login", data);
// };
// export const registerPatient = (data) => {
//   return api.post("/api/auth/patient-register", data);
// };
// export const registerDoctor = (data) => {
//   return api.post("/api/auth/doctor-register", data);
// };