import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./src/config/db.js";
import adminRouter from "./src/routers/adminRouter.js";
import userRouter from "./src/routers/userRouter.js";
import newUserRouter from "./src/routers/newUserRouter.js";
import ticketRouter from "./src/routers/ticketRouter.js";
import tokensRouter from "./src/routers/tokensRouter.js";
import mongoose from "mongoose";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// DB Connect
console.log("DATABASE =", process.env.DATABASE);

connectDB();

// Routes
app.use("/v1/admin", adminRouter);
app.use("/v1/user", userRouter);
app.use("/v1/new-user", newUserRouter);
app.use("/v1/ticket", ticketRouter);
app.use("/v1/tokens", tokensRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
