const companySchema = new mongoose.Schema({
    userType: { type: String, required: true, default: "Company" },
    name: { type: String, required: true, minlength: 2, maxlength: 100, trim: true },
    description: { type: String, required: false, trim: true },
    city: { type: String, required: true, maxlength: 50 },
    sector: {
      type: String,
      enum: [
        "Advocacy, Law & Politics",
        "Animals & Environment",
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
    founders: [{ type: String, required: false, trim: true }],
    logo: { type: String, required: false, trim: true },
    social_media: {
      facebook: { type: String, required: false, trim: true },
      twitter: { type: String, required: false, trim: true },
      linkedin: { type: String, required: false, trim: true },
    },
    volunteer_opportunities: [
      {
        position_name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        requirements: { type: String, trim: true },
        qualifications: { type: String, trim: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
      },
    ],
    reviews: [
      {
        user_name: { type: String, required: true, trim: true },
        comment: { type: String, required: true, trim: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  }, { timestamps: true });
  
  const Company = mongoose.model("Company", companySchema);
  
  export default Company;
  