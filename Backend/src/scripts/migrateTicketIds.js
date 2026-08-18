import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import mongoose from "mongoose";
import TicketModel from "../models/Ticket/ticketSchema.js";
import Counter from "../models/counter/counterSchema.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB Connected — starting migration...");

    const ticketsWithoutId = await TicketModel.find({
      ticketId: { $exists: false },
    }).sort({ openAt: 1, _id: 1 });

    if (ticketsWithoutId.length === 0) {
      console.log(
        "Koi bhi purana ticket nahi mila jise ID chahiye. Sab set hai.",
      );
      await mongoose.disconnect();
      return;
    }

    console.log(
      `${ticketsWithoutId.length} tickets mile jinme ticketId missing hai.`,
    );

    for (const ticket of ticketsWithoutId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "ticket" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );
      ticket.ticketId = counter.seq;
      await ticket.save();
      console.log(`Ticket "${ticket.subject}" -> ID #${counter.seq}`);
    }

    console.log("Migration complete ✅");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exit(1);
  }
};

run();
