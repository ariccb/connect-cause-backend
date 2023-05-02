import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: false },
  description: { type: String, required: false },
  city: { type: String, required: false },
  charityCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CharityCategory", // this needs to reference the MODEL NAME of the schema that you're referencing
      required: false,
    },
  ],
  size: { type: Number, required: false },
  website: { type: String, required: false },
  founded_date: { type: Date, required: false },
  founders: [{ type: String, required: false }],
  logo: { type: String, required: false },
  social_media: {
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false },
  },
  volunteer_opportunities: [
    {
      position_name: { type: String, required: false },
      description: { type: String, required: false },
      requirements: { type: String },
      qualifications: { type: String },
    },
  ],
  reviews: [
    {
      firstName: { type: String, required: false },
      comment: { type: String, required: false },
      rating: { type: Number, required: false, min: 1, max: 5 },
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
