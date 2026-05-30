import {
  adminLoginPending,
  adminLoginSuccess,
  adminLoginFail,
  adminLogoutAction,
} from "./adminSlice.js";
import { adminLogin, fetchAdmin, adminLogout } from "../api/adminApi.js";

export const adminLoginAction = (formData) => async (dispatch) => {
  dispatch(adminLoginPending());
  try {
    const result = await adminLogin(formData);

    if (result.status === "error") {
      return dispatch(adminLoginFail(result.message));
    }

    // Profile fetch karo
    const profile = await fetchAdmin();

    if (profile && profile.user) {
      dispatch(adminLoginSuccess(profile.user));
      // ✅ localStorage mein save karo
      localStorage.setItem("admin", JSON.stringify(profile.user));
    } else {
      dispatch(adminLoginFail("Could not fetch admin profile"));
    }
  } catch (error) {
    dispatch(adminLoginFail(error.message));
  }
};

export const adminLogoutThunk = () => async (dispatch) => {
  try {
    await adminLogout();
  } catch (error) {
    console.log("Logout API error:", error.message);
  } finally {
    // ✅ Slice mein hi sab clean ho jayega
    dispatch(adminLogoutAction());
  }
};

export const getAdminProfile = () => async (dispatch) => {
  try {
    const profile = await fetchAdmin();
    if (profile && profile.status === "success" && profile.user) {
      dispatch(adminLoginSuccess(profile.user));
      localStorage.setItem("admin", JSON.stringify(profile.user));
    }
  } catch (error) {
    console.log(error.message);
  }
};
