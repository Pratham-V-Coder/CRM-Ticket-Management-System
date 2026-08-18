import mongoose, { Schema } from "mongoose";

const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  seq: {
    type: Number,
    default: 10000, // pehla ticket 10001 se start hoga
  },
});

export default mongoose.model("Counter", counterSchema);
