// src/utils/tokenUtils.js
export const getTokenRole = (token) => {
  if (!token) return null;

  try {
    // Extract payload part of JWT
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));

    return payload.role || null;
  } catch (error) {
    console.error("Error extracting role from token:", error);
    return null;
  }
};
