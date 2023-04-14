import Companies from "./models/companiesSchema.js.";

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Companies.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCompany = async (req, res) => {
  const company = req.body;

  const newCompany = new Companies(company);

  try {
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Companies.findById(id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompanyById = async (req, res) => {
  const { id } = req.params;
  const company = req.body;

  try {
    const updatedCompany = await Companies.findByIdAndUpdate(id, company, { new: true });
    if (!updatedCompany) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCompany = await Companies.findByIdAndDelete(id);
    if (!deletedCompany) return res.status(404).json({ message: "Company not found" });
    res.status(200).json(deletedCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
