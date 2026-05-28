import api from "./api";

export const getAllAppointments = () => {
  return api.get("/api/appointments");
};

export const saveAppointment = (appointment) => {
  return api.post("/api/appointments", appointment);
};

export const deleteAppointment = (id) => {
  return api.delete(`/api/appointments/${id}`);
  
};
// UPDATE APPOINTMENT
export const updateAppointment = (id, data) => {
  return api.put(`/api/appointments/${id}`, data);
};