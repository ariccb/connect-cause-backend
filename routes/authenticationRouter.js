import express from "express";
import { signUpVolunteer, signUpCompany } from "../controllers/signup.js";
import { signInVolunteer } from "../controllers/signin.js";

const router = express.Router();

// route to this whole endpoint is "/volunteers"
router.post("/signup/volunteer", signUpVolunteer);
router.post("/signin/volunteer", signInVolunteer);
router.post("/signup/company", signUpCompany);
// router.get("/signin/company", signupCompany);

export default router;
