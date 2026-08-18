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
    console.log("MongoDB Connected — starting offset fix...");

    const tickets = await TicketModel.find({
      ticketId: { $exists: true, $lt: 10000 },
    }).sort({ ticketId: 1 });

    if (tickets.length === 0) {
      console.log(
        "Koi bhi ticket 10000 se neeche nahi mila. Kuch fix karne ki zarurat nahi.",
      );
      await mongoose.disconnect();
      return;
    }

    let maxNewId = 10000;

    for (const ticket of tickets) {
      const newId = ticket.ticketId + 10000;
      ticket.ticketId = newId;
      await ticket.save();
      console.log(`Ticket "${ticket.subject}" -> ID #${newId}`);
      if (newId > maxNewId) maxNewId = newId;
    }

    // Counter ko sahi value pe set karo taaki agla naya ticket maxNewId + 1 se start ho
    await Counter.findOneAndUpdate(
      { name: "ticket" },
      { $set: { seq: maxNewId } },
      { upsert: true },
    );

    console.log(
      `Counter set to ${maxNewId}. Agla naya ticket #${maxNewId + 1} hoga.`,
    );
    console.log("Offset fix complete ✅");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Fix failed:", error.message);
    process.exit(1);
  }
};

run();
