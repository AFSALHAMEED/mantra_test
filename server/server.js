import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookingRoute.js";

const app = express();

const port = process.env.PORT || 4000;

await connectDB();

const allowedOrigin = [
  "http://localhost:5173",
  "https://green-cart-delta.vercel.app",
];

app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => res.send("API is working"));
app.use("/api/customer", userRouter);
app.use("/api/book", bookRouter);

app.listen(port, () => {
  console.log(`server is running on port : http://localhost:${port}`);
});
