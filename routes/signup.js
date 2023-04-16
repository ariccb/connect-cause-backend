import express from "express";
import { signUpVolunteer } from "../controllers/signup.js";
import { signInVolunteer } from "../controllers/signin.js";

const router = express.Router();

// route to this whole endpoint is "/volunteers"
router.post("/signup/volunteer", signUpVolunteer);
router.get("/signin/volunteer", signInVolunteer);
// router.post("/signup/organization", signupOrganization);
// router.get("/signin/organization", signupOrganization);

export default router;
