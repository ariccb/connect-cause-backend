import express from "express";
import { getAllOpportunities, createOpportunity, getOpportunity } from "../models/opportunities.js";
import { isAdmin, isCompany } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.use("*", (req, res, next) => {
  console.log("opportunities router:", req.originalUrl);
  next();
});

// route to this whole endpoint is "/api/opportunities"
router.get("/", getAllOpportunities); //  endpoint is:          "/api/opportunities"      - GET method
router.get("/:_id", getOpportunity); //  endpoint is:          "/api/opportunities"      - GET method
router.post("/", isCompany, createOpportunity); //  endpoint is:          "/api/opportunities"      - GET method

export default router;
