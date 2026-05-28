import api from "./api";

export const getAllMedicalRecords = () => {
  return api.get("/api/medical-records");
};

export const saveMedicalRecord = (record) => {
  return api.post("/api/medical-records", record);
};

export const deleteMedicalRecord = (id) => {
  return api.delete(`/api/medical-records/${id}`);
};
export const updateMedicalRecord = (id, record) => {
  return api.put(`/api/medical-records/${id}`, record);
};