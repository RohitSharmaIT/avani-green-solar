import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("[MongoDB] MONGODB_URI is missing in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      maxPoolSize: 10,
      minPoolSize: 2,
    });

    console.log(
      `[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`
    );

    return conn;
  } catch (error) {
    console.error("[MongoDB] Connection failed:");
    console.error(error.message);

    process.exit(1);
  }
}

mongoose.connection.on("connected", () => {
  console.log("[MongoDB] Connection established");
});

mongoose.connection.on("error", (error) => {
  console.error("[MongoDB] Error:", error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("[MongoDB] Disconnected");
});