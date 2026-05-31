import api from "./api";

// GET ALL DEPARTMENTS
export const getAllDepartments = () => {
  return api.get("/api/departments");
};

// GET DEPARTMENT BY ID
export const getDepartmentById = (id) => {
  return api.get(`/api/departments/${id}`);
};

// SAVE DEPARTMENT
export const saveDepartment = (department) => {
  return api.post("/api/departments", department);
};

// UPDATE DEPARTMENT
export const updateDepartment = (id, department) => {
  return api.put(`/api/departments/${id}`, department);
};

// DELETE DEPARTMENT
export const deleteDepartment = (id) => {
  return api.delete(`/api/departments/${id}`);
};
export const getAllDepartments = () => {
  return api.get("/api/departments");
};