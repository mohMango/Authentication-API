import express from "express";
import dotenv from "dotenv";

import { authRoutes } from "./src/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

app.listen(5000, () => {
  console.log("run on 5000");
});
