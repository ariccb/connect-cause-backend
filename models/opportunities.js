// Schema to select company's opportunity and see details about it

import mongoose from "mongoose";
const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
  name: String,
  description: String,
  location: String,
  startDate: Date,
  endDate: Date,
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company", // this needs to reference the MODEL NAME of the schema that you're referencing
    required: false,
  },
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;

export async function getAllOpportunities(req, res) {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving opportunities");
  }
}
// Need help to create a route
export async function getOpportunity(req, res) {
  try {
    const opportunity = await Opportunity.findById(req.params._id);
    res.json(opportunity);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving opportunity");
  }
}

export const createOpportunity = async (req, res) => {
  const { name, description, location, startDate, endDate, companyId } = req.body;

  try {
    const companies = await Opportunity.create({
      name,
      description,
      location,
      startDate,
      endDate,
      companyId,
    });
    res.status(200).json(companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
