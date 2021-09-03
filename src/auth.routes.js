import express from "express";
import { login, logout, register, updatePassword } from "./auth.controller.js";
import { auth } from "./auth.middleware.js";

export const authRoutes = express.Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);

authRoutes.delete("/logout", auth, logout);
authRoutes.put("/updatepassword", auth, updatePassword);
