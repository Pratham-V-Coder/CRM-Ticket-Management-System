import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
  successMsg: "",
};

const newTicketSlice = createSlice({
  name: "newTicket",
  initialState,
  reducers: {
    openNewTicketPending: (state) => {
      state.isLoading = true;
      state.error = "";
      state.successMsg = "";
    },
    openNewTicketSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.successMsg = payload;
    },
    openNewTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    restSuccessMsg: (state) => {
      state.isLoading = false;
      state.successMsg = "";
      state.error = "";
    },
  },
});

export const {
  openNewTicketPending,
  openNewTicketSuccess,
  openNewTicketFail,
  restSuccessMsg,
} = newTicketSlice.actions;

export default newTicketSlice.reducer;
