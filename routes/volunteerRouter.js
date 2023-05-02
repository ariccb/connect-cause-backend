import express from "express";
import { isAdmin } from "../middleware/isAuthenticated.js";
import {
  getAllVolunteers,
  getVolunteer,
  patchVolunteer,
  deleteVolunteer,
} from "../controllers/volunteerController.js";

const router = express.Router();
router.use("*", (req, res, next) => {
  console.log("volunteer router:", req.originalUrl);
  next();
});

// route to this whole endpoint is "/api/volunteer"
router.get("/", getAllVolunteers); //  endpoint is:          "/api/volunteer"      - GET method
router.get("/:_id", getVolunteer); //  endpoint is:          "/api/volunteer/:_id" - GET method
router.patch("/:_id", patchVolunteer); //  endpoint is:      "/api/volunteer/:_id" - PATCH method
router.delete("/:_id", isAdmin, deleteVolunteer); //  endpoint is:    "/api/volunteer/:_id" - DELETE method

export default router;
