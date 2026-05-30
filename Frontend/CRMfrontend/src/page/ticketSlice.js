import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  originalTickets: [],
  isLoading: false,
  error: "",
  selectedTicket: null, // ✅ {} → null
  replyTicketError: "",
  replyMsg: "",
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    fetchTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchTicketSuccess: (state, action) => {
      state.tickets = action.payload;
      state.originalTickets = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    searchTickets: (state, { payload }) => {
      state.tickets = payload
        ? state.originalTickets.filter((row) =>
            row.subject.toLowerCase().includes(payload.toLowerCase()),
          )
        : state.originalTickets;
    },
    fetchSingleTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchSingleTicketSuccess: (state, { payload }) => {
      state.selectedTicket = payload; // ✅ ticket store hoga
      state.isLoading = false;
      state.error = "";
    },
    fetchSingleTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
      state.selectedTicket = null; // ✅ null karo
    },
    replyTicketLoading: (state) => {
      state.isLoading = true;
    },
    replyTicketSuccess: (state, { payload }) => {
      state.selectedTicket = payload;
      state.isLoading = false;
      state.error = "";
      state.replyMsg = "Reply sent successfully!";
    },
    replyTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.replyTicketError = payload;
    },
    closeTicketLoading: (state) => {
      state.isLoading = true;
    },
    closeTicketSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = "";
      state.replyMsg = "Ticket closed successfully!";
    },
    closeTicketFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    resetResponseMsg: (state) => {
      state.isLoading = false;
      state.replyTicketError = "";
      state.replyMsg = "";
    },
  },
});

const { actions, reducer } = ticketListSlice;

export const {
  fetchTicketLoading,
  fetchTicketFail,
  fetchTicketSuccess,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  searchTickets,
  replyTicketLoading,
  replyTicketSuccess,
  replyTicketFail,
  closeTicketLoading,
  closeTicketSuccess,
  closeTicketFail,
  resetResponseMsg,
} = actions;

export default reducer;
