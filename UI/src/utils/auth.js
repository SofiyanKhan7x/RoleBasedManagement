

// src/utils/auth.js
export const getUserRole = () => {
    return localStorage.getItem("role");
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };
  