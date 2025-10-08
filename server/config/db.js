import mongoose from "mongoose";

let isConnected = false; // ✅ prevent re-connections

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection");
    return;
  }

  try {
    const uri = process.env.MONGODB_URI; // ✅ fixed env name
    if (!uri) throw new Error("❌ MONGODB_URI not set in environment");

    const conn = await mongoose.connect(`${uri}/mantra`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
