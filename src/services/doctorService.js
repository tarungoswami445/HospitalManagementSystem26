import api from "./api";

export const getAllDoctors = () => {
  return api.get("/api/doctors");
};

export const saveDoctor = (doctor) => {
  return api.post("/api/doctors", doctor);
};

export const deleteDoctor = (id) => {
  return api.delete(`/api/doctors/${id}`);
};
export const getAllUsers = () => {
  return api.get("/api/users");
};
export const getAllDepartments = () => {
  return api.get("/api/departments");
};