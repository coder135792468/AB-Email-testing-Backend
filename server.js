import express from "express";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import experimentRoute from "./routes/experimentRoute.js";

const app = express();

app.use(express.json());

app.use("/api/experiments", experimentRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
