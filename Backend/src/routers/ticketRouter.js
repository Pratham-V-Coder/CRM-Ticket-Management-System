import express from "express";
import {
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
} from "../models/Ticket/ticketModel.js";
import { userAuthorization } from "../middleware/authorization.js";
import { adminAuthorization } from "../middleware/adminAuthorization.js";
import {
  createNewTicketValidation,
  replyTicketMessageValidation,
} from "../middleware/formValidationMiddleware.js";

const router = express.Router();

// ============ USER ROUTES ============

// Create new ticket
router.post(
  "/",
  createNewTicketValidation,
  userAuthorization,
  async (req, res) => {
    try {
      const { subject, sender, message } = req.body;
      const clientId = req.userId;
      const ticketObj = {
        clientId,
        subject,
        conversation: [{ sender, message }],
      };
      const result = await insertTicket(ticketObj);
      if (result._id) {
        return res.json({
          status: "success",
          message: "New ticket has been created",
        });
      }
      res.json({
        status: "error",
        message: "Unable to create the ticket, please try after some time",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  },
);

// Get all tickets for specific user
router.get("/user", userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getTickets(userId);
    return res.json({ status: "success", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Get ticket by ID for specific user
router.get("/:ticketId", userAuthorization, async (req, res) => {
  try {
    const userId = req.userId;
    const { ticketId } = req.params;
    const result = await getTicketsById(ticketId, userId);
    return res.json({ status: "success", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Reply on ticket — user
router.put(
  "/:_id",
  replyTicketMessageValidation,
  userAuthorization,
  async (req, res) => {
    try {
      const { message, sender } = req.body;
      const { _id } = req.params;
      const result = await updateClientReplay({ _id, message, sender });
      if (result._id) {
        return res.json({
          status: "success",
          message: "Your message is updated",
        });
      }
      res.json({
        status: "error",
        message: "Unable to update your message, please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  },
);

// Close ticket — user
router.patch("/close-ticket/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;
    const result = await updateStatusClose({ _id, clientId });
    if (result._id) {
      return res.json({
        status: "success",
        message: "The ticket has been closed",
      });
    }
    res.json({
      status: "error",
      message: "Unable to close the ticket, please try again later",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Delete ticket — user
router.delete("/:_id", userAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const clientId = req.userId;
    const result = await deleteTicket({ _id, clientId });
    if (result._id) {
      return res.json({
        status: "success",
        message: "The ticket has been deleted",
      });
    }
    res.json({
      status: "error",
      message: "Unable to delete the ticket, please try again later",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// ============ ADMIN ROUTES ============

// Get all tickets — admin
router.get("/admin/all", adminAuthorization, async (req, res) => {
  try {
    const result = await getAllTickets();
    return res.json({ status: "success", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Get single ticket by ID — admin
router.get("/admin/:ticketId", adminAuthorization, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const result = await getTicketByIdAdmin(ticketId);
    return res.json({ status: "success", result });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

// Reply on any ticket — admin
router.put(
  "/admin/:_id",
  replyTicketMessageValidation,
  adminAuthorization,
  async (req, res) => {
    try {
      const { message, sender } = req.body;
      const { _id } = req.params;
      const result = await updateClientReplay({ _id, message, sender });
      if (result._id) {
        return res.json({ status: "success", message: "Reply has been added" });
      }
      res.json({
        status: "error",
        message: "Unable to add reply, please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  },
);

// Close any ticket — admin
router.patch(
  "/admin/close-ticket/:_id",
  adminAuthorization,
  async (req, res) => {
    try {
      const { _id } = req.params;
      const result = await updateStatusCloseAdmin({ _id });
      if (result._id) {
        return res.json({
          status: "success",
          message: "Ticket has been closed",
        });
      }
      res.json({
        status: "error",
        message: "Unable to close the ticket, please try again later",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  },
);

// Delete any ticket — admin
router.delete("/admin/:_id", adminAuthorization, async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await deleteTicketAdmin({ _id });
    if (result._id) {
      return res.json({
        status: "success",
        message: "Ticket has been deleted",
      });
    }
    res.json({
      status: "error",
      message: "Unable to delete the ticket, please try again later",
    });
  } catch (error) {
    res.json({ status: "error", message: error.message });
  }
});

export default router;
