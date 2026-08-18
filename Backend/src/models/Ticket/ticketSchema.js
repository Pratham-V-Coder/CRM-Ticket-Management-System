import mongoose, { Schema } from "mongoose";
import { getNextSequence } from "../counter/counterModel.js";

const TICKET_CATEGORIES = [
  "hardware",
  "software",
  "network",
  "application",
  "account_hr",
  "email",
  "asset_request",
  "security",
  "printer_scanner",
  "server_database",
  "training_onboarding",
  "other",
];

const ticketSchema = new Schema({
  ticketId: {
    type: Number,
    unique: true,
    required: true,
    sparse: true,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subject: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: TICKET_CATEGORIES,
    default: "other",
  },
  openAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    default: "Pending operator response",
  },
  conversation: [
    {
      sender: {
        type: String,
        required: true,
        default: "",
      },
      message: {
        type: String,
        required: true,
        default: "",
      },
      msgAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],
});

ticketSchema.pre("validate", async function (next) {
  try {
    if (this.isNew && (this.ticketId === undefined || this.ticketId === null)) {
      this.ticketId = await getNextSequence("ticket");
    }
    next();
  } catch (error) {
    next(error);
  }
});

export { TICKET_CATEGORIES };
export default mongoose.model("Ticket", ticketSchema);
