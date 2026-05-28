import api from "./api";

export const getAllPrescriptions = () => {
  return api.get("/api/prescriptions");
};

export const savePrescription = (data) => {
  return api.post("/api/prescriptions", data);
};

export const deletePrescription = (id) => {
  return api.delete(`/api/prescriptions/${id}`);
};
export const updatePrescription = (id, data) => {
  return api.put(`/api/prescriptions/${id}`, data);
};