import api from "./api";

export const getRooms = () => api.get("/api/rooms");

export const getRoomById = (id) => api.get(`/api/rooms/${id}`);

export const createRoom = (data) => api.post("/api/rooms", data);

export const updateRoom = (id, data) => api.put(`/api/rooms/${id}`, data);

export const deleteRoom = (id) => api.delete(`/api/rooms/${id}`);
