import express from "express";
import {
  getAllCompanies,
  createCompany,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
} from "./companiesController.js";

const router = express.Router();

// Get all companies
router.get("/", getAllCompanies);

// Create a new company
router.post("/", createCompany);

// Get a company by ID
router.get("/:id", getCompanyById);

// Update a company by ID
router.put("/:id", updateCompanyById);

// Delete a company by ID
router.delete("/:id", deleteCompanyById);

export default router;
