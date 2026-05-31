import api from "./api";

export const getAllBeds = () => {
  return api.get("/api/beds");
};

export const getBedById = (id) => {
  return api.get(`/api/beds/${id}`);
};

export const saveBed = (data) => {
  return api.post("/api/beds", data);
};

export const updateBed = (id, data) => {
  return api.put(`/api/beds/${id}`, data);
};

export const deleteBed = (id) => {
  return api.delete(`/api/beds/${id}`);
};