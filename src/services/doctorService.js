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