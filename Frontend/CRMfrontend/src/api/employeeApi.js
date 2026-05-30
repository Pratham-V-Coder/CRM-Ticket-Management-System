import axios from "axios";

const rootUrl = "http://localhost:4000/v1/new-user/";

const getAuthHeader = () => {
  const token =
    sessionStorage.getItem("accessJWT") || localStorage.getItem("accessJWT");
  return { Authorization: `Bearer ${token}` };
};

// Naya employee banao
export const createEmployee = async (formData) => {
  try {
    const res = await axios.post(rootUrl + "create-user", formData, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Sabhi employees fetch karo
export const fetchAllEmployees = async () => {
  try {
    const res = await axios.get(rootUrl + "users", {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Employee block/unblock
export const toggleEmployeeStatus = async (userId, isActive) => {
  try {
    const res = await axios.put(
      rootUrl + "toggle-status",
      { userId, isActive },
      { headers: getAuthHeader() },
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
