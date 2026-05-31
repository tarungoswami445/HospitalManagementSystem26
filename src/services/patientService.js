import api from "./api";


export const getAllPatients = () => {
  return api.get("/api/patients");
};

export const getPatientById = (id) => {
  return api.get(`/api/patients/${id}`);
};

export const savePatient = (patient) => {
  return api.post("/api/patients", patient);
};

export const updatePatient = (id, patient) => {
  return api.put(`/api/patients/${id}`, patient);
};

export const deletePatient = (id) => {
  return api.delete(`/api/patients/${id}`);
};
export const getAllUsers = () => {
  return api.get("/api/users");
};
