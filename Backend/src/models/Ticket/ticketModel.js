import TicketModel from "./ticketSchema.js";

const insertTicket = (ticketObj) => {
  return new Promise((resolve, reject) => {
    try {
      new TicketModel(ticketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTickets = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getAllTickets = () => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.find()
        .populate("clientId", "name email") // ✅ Add kiya
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTicketsById = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.find({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const getTicketByIdAdmin = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.findOne({ _id })
        .populate("clientId", "name email") // ✅ Add kiya
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateClientReplay = ({ _id, message, sender }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.findOneAndUpdate(
        { _id },
        {
          status: "Pending Operator response",
          $push: {
            conversation: { message, sender },
          },
        },
        { new: true },
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatusClose = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.findOneAndUpdate(
        { _id, clientId },
        { status: "Closed" },
        { new: true },
      )
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatusCloseAdmin = ({ _id }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.findOneAndUpdate({ _id }, { status: "Closed" }, { new: true })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteTicket = ({ _id, clientId }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

const deleteTicketAdmin = ({ _id }) => {
  return new Promise((resolve, reject) => {
    try {
      TicketModel.findOneAndDelete({ _id })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};

export {
  insertTicket,
  getTickets,
  getAllTickets,
  getTicketsById,
  getTicketByIdAdmin,
  updateClientReplay,
  updateStatusClose,
  updateStatusCloseAdmin,
  deleteTicket,
  deleteTicketAdmin,
};
