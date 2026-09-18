import "dotenv/config";
import mongoose from "mongoose";

async function testMongoDB() {
  try {
    console.log("Testing MongoDB Atlas connection...");

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("=================================");
    console.log("MongoDB Atlas connection SUCCESS");
    console.log("Host:", mongoose.connection.host);
    console.log("Database:", mongoose.connection.name);
    console.log("=================================");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("=================================");
    console.error("MongoDB Atlas connection FAILED");
    console.error(error);
    console.error("=================================");

    process.exit(1);
  }
}

testMongoDB();