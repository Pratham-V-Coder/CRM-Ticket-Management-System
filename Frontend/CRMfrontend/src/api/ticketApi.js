import axios from "axios";
import {
  openNewTicketFail,
  openNewTicketPending,
} from "../page/addTicketSlicer";

const rootUrl = "http://localhost:4000/v1/";
const ticketUrl = rootUrl + "ticket";
const closeTicketUrl = rootUrl + "ticket/close-ticket/";

// ✅ Naya Ticket Banao
export const createTicket = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.post(ticketUrl, frmData, {
        headers: {
          Authorization: `Bearer ${accessJWT}`, // ✅ Bearer add kiya
        },
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

// ✅ Saare Tickets Lo
export const fetchTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) return reject("Token not found");

      const res = await axios.get(ticketUrl + "/user", {
        headers: {
          Authorization: `Bearer ${accessJWT}`, // ✅ Bearer add karo
        },
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

// ✅ Ek Ticket Lo by ID
export const fetchTicketById = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.get(`${ticketUrl}/${_id}`, {
        headers: {
          Authorization: accessJWT,
        },
      });
      console.log(res);
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

// ✅ Ticket Update Karo (Status etc)
export const updateTicket = (_id, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.patch(`${ticketUrl}/${_id}`, formData, {
        headers: {
          Authorization: accessJWT,
        },
      });
      console.log(res);
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

// ✅ Ticket Delete Karo
export const deleteTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.delete(`${ticketUrl}/${_id}`, {
        headers: {
          Authorization: accessJWT,
        },
      });
      console.log(res);
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

// ✅ Ticket mein Reply Karo (conversation update)
export const updateReplyTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) {
        return reject("Token not found");
      }
      const res = await axios.put(`${ticketUrl}/${_id}`, msgObj, {
        headers: {
          Authorization: accessJWT,
        },
      });
      console.log(res);
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

// ✅ Ticket Status Close Karo
export const updateTicketStatusClose = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(
        closeTicketUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        },
      );
      console.log(res);
      resolve(res.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

// ✅ Redux Thunk - New Ticket Open Karo
export const openNewTicket = (frmData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(openNewTicketPending());
      const result = await createTicket(frmData);
      resolve(result);
    } catch (error) {
      console.log(error.message);
      dispatch(openNewTicketFail(error.message));
      reject(error);
    }
  });
};

// ✅ Naya Ticket Create Karo
export const createNewTicket = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        return reject("Token not found");
      }

      const result = await axios.post(ticketUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessJWT}`, // ✅ Bearer add kiya
        },
      });
      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

export const getSingleTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");
      if (!accessJWT) return reject("Token not found");

      const result = await axios.get(`${ticketUrl}/${_id}`, {
        headers: {
          Authorization: `Bearer ${accessJWT}`, // ✅ Bearer add karo
        },
      });
      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};

// ✅ Ye naye functions add karo file ke end mein

// Admin — saare tickets fetch karo
export const fetchAllTicketsAdmin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT =
        sessionStorage.getItem("accessJWT") ||
        localStorage.getItem("accessJWT");
      if (!accessJWT) return reject("Token not found");

      const res = await axios.get(ticketUrl + "/admin/all", {
        headers: { Authorization: `Bearer ${accessJWT}` },
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

// Admin — single ticket fetch karo
export const fetchSingleTicketAdmin = (ticketId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT =
        sessionStorage.getItem("accessJWT") ||
        localStorage.getItem("accessJWT");
      if (!accessJWT) return reject("Token not found");

      const res = await axios.get(`${ticketUrl}/admin/${ticketId}`, {
        headers: { Authorization: `Bearer ${accessJWT}` },
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

// Admin — reply karo
export const replyTicketAdmin = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT =
        sessionStorage.getItem("accessJWT") ||
        localStorage.getItem("accessJWT");
      if (!accessJWT) return reject("Token not found");

      const res = await axios.put(`${ticketUrl}/admin/${_id}`, msgObj, {
        headers: { Authorization: `Bearer ${accessJWT}` },
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

// Admin — ticket close karo
export const closeTicketAdmin = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT =
        sessionStorage.getItem("accessJWT") ||
        localStorage.getItem("accessJWT");
      if (!accessJWT) return reject("Token not found");

      const res = await axios.patch(
        `${ticketUrl}/admin/close-ticket/${_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${accessJWT}` },
        },
      );
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

// Admin — ticket delete karo
export const deleteTicketAdmin = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT =
        sessionStorage.getItem("accessJWT") ||
        localStorage.getItem("accessJWT");
      if (!accessJWT) return reject("Token not found");

      const res = await axios.delete(`${ticketUrl}/admin/${_id}`, {
        headers: { Authorization: `Bearer ${accessJWT}` },
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};
