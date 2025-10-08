import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import bookRouter from "./routes/bookingRoute.js";

const app = express();

const port = process.env.PORT || 4000;

const allowedOrigin = [
  "http://localhost:5173",
  "https://green-cart-delta.vercel.app",
];

await connectDB();

app.use(cookieParser());
app.use(cors({ origin: allowedOrigin, credentials: true }));

app.use(express.json());

app.get("/", (req, res) => res.send("APi is working "));

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);

app.listen(port, () => {
  console.log(`server is running on port : http://localhost:${port}`);
});
