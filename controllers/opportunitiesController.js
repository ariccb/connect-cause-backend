import Opportunity from "../models/opportunityModel.js";

// Get all opportunities
export const getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.status(200).json(opportunities);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get an opportunity by ID
export const getOpportunityById = async (req, res) => {
  const { id } = req.params;

  try {
    const opportunity = await Opportunity.findById(id);
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update an opportunity by ID
export const updateOpportunityById = async (req, res) => {
  const { id } = req.params;
  const { position_name, description } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      id,
      { position_name, description },
      { new: true }
    );

    res.status(200).json(updatedOpportunity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete an opportunity by ID
export const deleteOpportunityById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  try {
    const deletedOpportunity = await Opportunity.findByIdAndDelete(id);
    res.status(200).json(deletedOpportunity);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
