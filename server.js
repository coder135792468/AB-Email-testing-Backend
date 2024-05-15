import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import experimentRoute from "./routes/templateRoute.js";
import mailRoute from "./routes/mailRoute.js";
import connectDB from "./utils/db.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));

app.use("/api/templates", experimentRoute);
app.use("/api/mail", mailRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
