import {
  openNewTicketPending,
  openNewTicketSuccess,
  openNewTicketFail,
} from "./addTicketSlicer";
import { createNewTicket } from "../api/ticketApi";
import { fetchAllTickets } from "./TicketsAction.jsx";

export const openNewTicket = (frmData) => async (dispatch) => {
  try {
    dispatch(openNewTicketPending());

    const result = await createNewTicket(frmData);

    if (result.status === "error") {
      dispatch(openNewTicketFail(result.message));
      return false; // ✅ fail pe false return
    }

    dispatch(openNewTicketSuccess(result.message));
    await dispatch(fetchAllTickets());
    return true; // ✅ success pe true return
  } catch (error) {
    console.log(error);
    dispatch(openNewTicketFail(error.message));
    return false;
  }
};
