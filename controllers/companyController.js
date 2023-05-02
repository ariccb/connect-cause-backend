import Company from "../models/companySchema.js";

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getCompanyById = async (req, res) => {
    const { id } = req.params;

    try {
        const company = await Company.findById(id);
        if (!company) return res.status(404).json({ message: "Company not found" });
        res.status(200).json({
            message: `Retrieved company (id: ${_id})`,
            result: { company },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCompanyById = async (req, res) => {
    console.log(`Trying to patch a company.`);
    const { _id } = req.params;
    const companyPatch = req.body;

    console.log(`Attempting to update company with _id: ${_id}`);

    if (!isValidId(_id)) {
        return res.status(404).send(`No company found with _id: ${_id}`);
    }
    try {
        console.log("attempting patch company");
        await Company.findByIdAndUpdate(_id, {
            ...companyPatch,
            updated_at: new Date().toISOString(),
        });
        const companyUpdated = await Company.findById(_id);
        res.json({
            message: `Updated company (id:${_id}).`,
            updated: { companyPatch },
            result: { companyUpdated },
        });
    } catch (error) {
        res.json({
            message: `Something went wrong when trying to patch the company with _id: ${_id}`,
        });
    }
};

export const deleteCompanyById = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCompany = await Company.findByIdAndDelete(id);
        if (!deletedCompany) return res.status(404).json({ message: "Company not found" });
        res.status(200).json(deletedCompany);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
