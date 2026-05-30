import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    // console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
