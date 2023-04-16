import express from "express";
import { signUpVolunteer } from "../controllers/signup.js";
import { signInVolunteer } from "../controllers/signin.js";

const router = express.Router();

// route to this whole endpoint is "/volunteers"
router.post("/volunteer/signup", signUpVolunteer);
router.get("/volunteer/signin", signInVolunteer);
// router.post("/organization", signupOrganization);
// router.get("/organization", signupOrganization);

export default router;
