import CharityCategory from "../models/charityCategorySchema.js";

export const getAllOpportunities = async (req, res) => {
  try {
    const interests = await CharityCategory.find();
    res.status(200).json(interests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
