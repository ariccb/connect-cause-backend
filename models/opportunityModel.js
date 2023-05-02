import mongoose from "mongoose";

const opportunitySchema = mongoose.Schema({
  position_name: String,
  description: String,
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

export default Opportunity;
