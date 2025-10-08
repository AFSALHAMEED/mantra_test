import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookingRoute.js";

const app = express();

// ✅ Connect to DB only once
await connectDB();

const allowedOrigin = [
  "http://localhost:5173",
  "https://green-cart-delta.vercel.app",
];

app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());

// ✅ Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);

// ❌ REMOVE app.listen()
// ✅ Instead export the app as the default export
export default app;
