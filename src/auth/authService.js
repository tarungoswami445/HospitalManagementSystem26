import api from "../services/api";

export const loginUser = (data) => {
  return api.post("/api/auth/login", data);
};
export const registerPatient = (data) => {
  return api.post("/api/auth/patient-register", data);
};
export const registerDoctor = (data) => {
  return api.post("/api/auth/doctor-register", data);
};