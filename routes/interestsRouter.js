import express from "express";
import { getAllOpportunities } from "../controllers/interests.js";
import { isAdmin } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.use("*", (req, res, next) => {
  console.log("interests router:", req.originalUrl);
  next();
});

// route to this whole endpoint is "/api/volunteer"
router.get("/", getAllOpportunities); //  endpoint is:          "/api/volunteer"      - GET method

export default router;
