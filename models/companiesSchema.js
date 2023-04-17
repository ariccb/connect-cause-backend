import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  industry: { type: String, required: true },
  size: { type: Number, required: true },
  website: { type: String, required: true },
  founded_date: { type: Date, required: true },
  founders: { type: [String], required: true },
  logo: { type: String, required: true },
  social_media: {
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    linkedin: { type: String, required: false },
  },
  volunteer_opportunities: [
    {
      position_name: { type: String, required: true },
      description: { type: String, required: true },
      requirements: { type: String },
      qualifications: { type: String },
    },
  ],
  reviews: [
    {
      user_name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
