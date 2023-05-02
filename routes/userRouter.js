import express from "express";
import { isAdmin } from "../middleware/isAuthenticated.js";
import { getAllUsers } from "../models/userSchema.js";

const router = express.Router();
router.use("*", (req, res, next) => {
  console.log("user router:", req.originalUrl);
  next();
});

// route to this whole endpoint is "/api/user"
router.get("/", isAdmin, getAllUsers); //  endpoint is:          "/api/volunteer"      - GET method

export default router;
