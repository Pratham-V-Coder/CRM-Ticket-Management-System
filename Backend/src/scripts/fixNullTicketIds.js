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
    console.log("MongoDB Connected — fixing null ticketIds...");

    const ticketsWithNullId = await TicketModel.find({
      ticketId: null,
    }).sort({ openAt: 1, _id: 1 });

    if (ticketsWithNullId.length === 0) {
      console.log("Koi bhi ticket null ticketId ke saath nahi mila.");
      await mongoose.disconnect();
      return;
    }

    console.log(
      `${ticketsWithNullId.length} tickets mile jinka ticketId null hai.`,
    );

    for (const ticket of ticketsWithNullId) {
      const counter = await Counter.findOneAndUpdate(
        { name: "ticket" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );
      ticket.ticketId = counter.seq;
      await ticket.save();
      console.log(`Ticket "${ticket.subject}" -> ID #${counter.seq}`);
    }

    console.log("Null ticketId fix complete ✅");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Fix failed:", error.message);
    process.exit(1);
  }
};

run();
