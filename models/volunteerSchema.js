import mongoose from "mongoose";

/** this is the schema for the volunteers that sign up
 * to our application.
 */

const volunteerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    // will need to implement some authentication / encryption to the password field - need to look into that
    password: { type: String, required: true },
    created_at: {
        type: Date,
        default: new Date(),
    },
    updated_at: {
        type: Date,
        required: false,
    },
    interests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interest", // this needs to reference the MODEL NAME of the schema that you're referencing
            required: false,
        },
    ],
    about_me: { type: String, required: false },
    volunteering_records: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VolunteeringRecord", // this needs to reference the MODEL NAME of the schema that you're referencing
        required: false,
    },
    profile_image: { type: String, required: false },
    linkedin_link: { type: String, required: false },
});

const Volunteer = mongoose.model("volunteer", volunteerSchema); //this will show up on MongoDB on the "volunteers" collection
// volunteers will be the name of the collection on MongoDB
export default Volunteer;
