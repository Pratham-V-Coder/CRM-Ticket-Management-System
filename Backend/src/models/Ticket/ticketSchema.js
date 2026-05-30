import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "User", // ✅ Add kiya
  },
  subject: {
    type: String,
    required: true,
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

export default mongoose.model("Ticket", ticketSchema);
