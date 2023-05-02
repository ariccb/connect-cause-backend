import express from "express";
import {
    getAllCompanies,
    getCompanyById,
    updateCompanyById,
    deleteCompanyById,
} from "../controllers/companyController.js";

const router = express.Router();

// full route to this point is api/company/
router.get("/", getAllCompanies); //  endpoint is:          "/api/company"      - GET method
router.get("/:id", getCompanyById); //  endpoint is:        "/api/company/:_id" - GET method
router.patch("/:id", updateCompanyById); //  endpoint is:   "/api/company/:_id" - PATCH method
router.delete("/:id", deleteCompanyById); //  endpoint is:  "/api/company/:_id" - DELETE method

export default router;
