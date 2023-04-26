import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    userType: { type: String, required: true, default: "Company" },
    name: { type: String, required: true },
    description: { type: String, required: false },
    city: { type: String, required: true },
    sector: {
        // what sector does the non-profit organization serve?
        type: String,
        enum: [
            // lets you have pre-determined options
            "Advocacy, Law & Politics", //original implementation of versus
            "Animals & Environment", // example, in chess, outcomes could be win/lose/draw, or sports
            "Arts, Culture & Heritage",
            "Development & Housing",
            "Education & Schools",
            "Fundraising, Grant Making & Foundations",
            "Health & Medical",
            "International",
            "Religion",
            "Other",
            "Pick The Sector Your Organization Serves",
            "Social & Community Services",
            "Sports & Recreation",
        ],
        default: "Pick The Sector Your Organization Serves",
    },
    size: { type: Number, required: false },
    website: { type: String, required: true },
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
