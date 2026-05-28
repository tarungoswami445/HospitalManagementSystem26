import api from "./api";

export const getPatients = () => {
  return api.get("/api/patients");
};

export const getDoctors = () => {
  return api.get("/api/doctors");
};

export const getAppointments = () => {
  return api.get("/api/appointments");
};

export const getAdmissions = () => {
  return api.get("/api/admissions");
};
export const getPrescriptions = () => {
  return api.get("/api/prescriptions");
};

export const getMedicalRecords = () => {
  return api.get("/api/medical-records");
};
//
export const getRooms = () => {
  return api.get("/api/rooms");
};

export const getEmergencyRequests = () => {
  return api.get("/api/emergency-requests");
};