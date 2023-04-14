import express from "express";
import { signupVolunteers } from "../controllers/signupSigninController.js";

const router = express.Router();

// route to this whole endpoint is "/volunteers"
router.post("/volunteer", signupVolunteers);
router.get("/volunteer", signinVolunteers);
router.post("/organization", signupOrganization);
router.get("/organization", signupOrganization);

export default router;
