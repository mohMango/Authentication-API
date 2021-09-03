import express from "express";
import dotenv from "dotenv";

import { authRoutes } from "./src/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(PORT, () => {
  console.log(`run on ${PORT}`);
});
