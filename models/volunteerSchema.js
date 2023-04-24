import mongoose from "mongoose";
import bcrypt from "bcrypt";

const volunteerSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  birth_date: { type: Date, required: true },
  updated_at: { type: Date, required: false },
  interests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Interest", required: false }],
  about_me: { type: String, required: false },
  volunteering_records: [{ type: mongoose.Schema.Types.ObjectId, ref: "VolunteeringRecord", required: false }],
  profile_image: { type: String, required: false },
  linkedin_link: { type: String, required: false }
});

newVolunteer.save((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Volunteer saved successfully!");
  }
});


volunteerSchema.pre("save", async function (next) {
  const volunteer = this;

  if (!volunteer.isModified("password")) {
    return next();
  }

  try { 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(volunteer.password, salt);
    volunteer.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

volunteerSchema.methods.isValidPassword = async function (password) {
  const volunteer = this;
  return await bcrypt.compare(password, volunteer.password);
};

const Volunteer = mongoose.model("volunteer", volunteerSchema);

export default Volunteer;
