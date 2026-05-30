import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  user: {},
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },

    loginSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.user = payload;
      state.error = "";
    },

    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = {};
      state.error = payload;
    },

    logout: (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = {};
      state.error = "";

      localStorage.removeItem("user");
      localStorage.removeItem("accessJWT");
      localStorage.removeItem("crmSite");
      sessionStorage.removeItem("accessJWT");
    },
  },
});

const { actions, reducer } = loginSlice;

export const { loginPending, loginSuccess, loginFail, logout } = actions;

export default reducer;
