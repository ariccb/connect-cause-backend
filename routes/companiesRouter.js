import express from "express";
import { getAllCompanies, getCompanyById, updateCompanyById, deleteCompanyById } from "../controllers/companiesController.js";

const router = express.Router();

// Get all companies
router.get("/", getAllCompanies);

// Get a company by ID
router.get("/:id", getCompanyById);

// Update a company by ID
router.put("/:id", updateCompanyById);

// Delete a company by ID
router.delete("/:id", deleteCompanyById);

export default router;
