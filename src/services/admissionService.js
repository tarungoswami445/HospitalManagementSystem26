import api from "./api";

export const getAllAdmissions = () => {
  return api.get("/api/admissions");
};

export const saveAdmission = (admission) => {
  return api.post("/api/admissions", admission);
};

export const deleteAdmission = (id) => {
  return api.delete(`/api/admissions/${id}`);
};

// ✅ ADD THIS
export const updateAdmission = (id, admission) => {
  return api.put(`/api/admissions/${id}`, admission);
};