import express from "express";
import {
    getAllVolunteers,
    getVolunteer,
    createVolunteer,
    updateVolunteer,
    patchVolunteer,
    deleteVolunteer,
} from "../controllers/volunteerController.js";

const router = express.Router();

// route to this whole endpoint is "/volunteers"
router.get("/", getAllVolunteers);
router.get("/:_id", getVolunteer);
router.post("/", createVolunteer);
router.put("/:_id", updateVolunteer); //needs to send the whole body object
router.patch("/:_id", patchVolunteer); // update just the properties you send in the request body
router.delete("/:_id", deleteVolunteer);

export default router;
