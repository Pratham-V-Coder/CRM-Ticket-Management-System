import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  error: "",
  admin: {},
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginPending: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    adminLoginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.admin = payload;
    },
    adminLoginFail: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.error = payload;
    },
    adminLogoutAction: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.admin = {};
      state.error = "";

      // ✅ localStorage bhi clean karo
      localStorage.removeItem("admin");
      localStorage.removeItem("accessJWT");
      localStorage.removeItem("crmSite");
      sessionStorage.removeItem("accessJWT");
    },
  },
});

export const {
  adminLoginPending,
  adminLoginSuccess,
  adminLoginFail,
  adminLogoutAction,
} = adminSlice.actions;

export default adminSlice.reducer;
