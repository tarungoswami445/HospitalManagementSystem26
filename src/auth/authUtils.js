export const setAuth = (token, role, fullName) => {

  localStorage.setItem("token", token);

  localStorage.setItem("role", role);

  localStorage.setItem("fullName", fullName);
};

export const getToken = () => {

  return localStorage.getItem("token");
};

export const getRole = () => {

  return localStorage.getItem("role");
};

export const getFullName = () => {

  return localStorage.getItem("fullName");
};

export const logout = () => {

  localStorage.removeItem("token");

  localStorage.removeItem("role");

  localStorage.removeItem("fullName");
};