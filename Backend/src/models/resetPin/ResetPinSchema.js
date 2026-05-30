import mongoose from "mongoose";
import { Schema } from "mongoose";

const ResetPinSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  pin: {
    type: Number,
    maxlength: 6,
    minlength: 6,
    required: true,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now, // ✅ Fixed: Date.now() → Date.now (without brackets)
  },
});

export const ResetPinModel = mongoose.model("ResetPin", ResetPinSchema); // ✅ Fixed: module.export → export
