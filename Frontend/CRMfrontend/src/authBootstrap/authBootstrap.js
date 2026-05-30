import { loginSuccess } from "../page/LoginSlice";
import { adminLoginSuccess } from "../page/adminSlice";
import { getUserSuccess } from "../page/userSlice";

export const loadAuthFromStorage = (store) => {
  try {
    const accessJWT = localStorage.getItem("accessJWT");
    const adminData = localStorage.getItem("admin");
    const userData = localStorage.getItem("user");
    const crmSite = localStorage.getItem("crmSite");

    // Agar koi token nahi hai toh kuch restore mat karo
    if (!accessJWT) return;

    // accessJWT sessionStorage mein bhi set karo
    sessionStorage.setItem("accessJWT", accessJWT);

    // Admin restore
    if (adminData && crmSite) {
      const parsed = JSON.parse(adminData);
      store.dispatch(adminLoginSuccess(parsed));
      return; // Admin restore ho gaya, user restore mat karo
    }

    // User restore
    if (userData && crmSite) {
      const parsed = JSON.parse(userData);
      store.dispatch(loginSuccess(parsed));
      store.dispatch(getUserSuccess(parsed));
    }
  } catch (err) {
    console.error("Auth restore failed:", err);
  }
};
