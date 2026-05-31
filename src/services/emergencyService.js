import api from "./api";

export const getAllEmergencyRequests = () => {
  return api.get("/api/emergency-requests");
};

export const saveEmergencyRequest = (request) => {
  return api.post("/api/emergency-requests", request);
};

export const deleteEmergencyRequest = (id) => {
  return api.delete(`/api/emergency-requests/${id}`);
};

export const updateEmergencyRequest = (id, request) => {
  return api.put(`/api/emergency-requests/${id}`, request);
};
export const getAllPatients = () => {
  return api.get("/api/patients");
};