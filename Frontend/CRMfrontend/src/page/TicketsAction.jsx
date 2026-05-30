import {
  fetchTicketLoading,
  fetchTicketFail,
  fetchTicketSuccess,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFail,
  replyTicketLoading,
  replyTicketFail,
  closeTicketFail,
  closeTicketSuccess,
  closeTicketLoading,
} from "./ticketSlice";

import {
  fetchTickets,
  getSingleTicket,
  updateReplyTicket,
  updateTicketStatusClose,
} from "../api/ticketApi";

export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());
  try {
    const result = await fetchTickets();
    console.log("Tickets result:", result);
    if (result.status === "success") {
      const tickets = result.result || result.tickets || result.data || [];
      dispatch(fetchTicketSuccess(tickets));
    }
  } catch (error) {
    dispatch(fetchTicketFail(error.message));
  }
};

export const filterSearchTicket = (str) => (dispatch) => {
  dispatch(searchTickets(str));
};

export const fetchSingleTicket = (_id) => async (dispatch) => {
  dispatch(fetchSingleTicketLoading());
  try {
    const result = await getSingleTicket(_id);
    console.log("Single ticket result:", result);

    // ✅ backend se result.result[0] aata hai
    if (result.status === "success" && result.result?.length > 0) {
      dispatch(fetchSingleTicketSuccess(result.result[0]));
    } else {
      dispatch(fetchSingleTicketFail("Ticket not found"));
    }
  } catch (error) {
    dispatch(fetchSingleTicketFail(error.message));
  }
};

export const replayOnTicket = (_id, msgObj) => async (dispatch) => {
  dispatch(replyTicketLoading());
  try {
    const result = await updateReplyTicket(_id, msgObj);
    console.log(result);
    if (result.status === "error") {
      return dispatch(replyTicketFail(result.message)); // ✅ fix
    }
    dispatch(fetchSingleTicket(_id));
  } catch (error) {
    console.log(error.message);
    dispatch(replyTicketFail(error.message));
  }
};

export const closeTicket = (_id) => async (dispatch) => {
  dispatch(closeTicketLoading());
  try {
    const result = await updateTicketStatusClose(_id);
    console.log(result);
    if (result.status === "error") {
      return dispatch(closeTicketFail(result.message));
    }
    dispatch(fetchSingleTicket(_id)); // ✅ updated ticket fetch karo
    dispatch(closeTicketSuccess(result.message));
  } catch (error) {
    console.log(error);
    dispatch(closeTicketFail(error.message)); // ✅ fix
  }
};
