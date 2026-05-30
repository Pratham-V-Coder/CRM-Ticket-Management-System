import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./page/ticketSlice";
import loginReducer from "./page/LoginSlice";
import newTicketReducer from "./page/addTicketSlicer";
import adminReducer from "./page/adminSlice";
import userReducer from "./page/userSlice"; // ✅ Add this

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
    login: loginReducer,
    openTicket: newTicketReducer,
    admin: adminReducer,
    user: userReducer, // ✅ Add this
  },
});

export default store;
