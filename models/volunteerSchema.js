import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  //removed email and password from volunteer schema and moved it to "userSchema"
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  interests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CharityCategory", // this needs to reference the MODEL NAME of the schema that you're referencing
      required: false,
    },
  ],
  about_me: { type: String, required: false },
  volunteering_records: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VolunteeringRecord", // this needs to reference the MODEL NAME of the schema that you're referencing
      required: false,
    },
  ],
  profileImage: { type: String, required: false },
  linkedinLink: { type: String, required: false },
  pastVolunteer: { type: Boolean, required: false }, // add past_volunteer field as a string
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

// create the Volunteer model based on the schema above and export it to be saved in the database.
let Volunteer = mongoose.model("volunteer", volunteerSchema);

// export the Volunteer model
export default Volunteer;
