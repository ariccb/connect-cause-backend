import mongoose from "mongoose";
import bcrypt from "bcrypt"; // this is a package that will encrypt the password. use npm install bcrypt to install it.
import { cpSync } from "fs";

/** this is the schema for the volunteers that sign up
 * to our application.
 */

const volunteerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
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
    past_volunteer: { type: String, required: false }, // add past_volunteer field as a string
});

//felmon is working on this password hashing part.
// this code hash the password before saving it to the database. this is a middleware function that will run before the save function is called.
// this is a pre hook. this code will run before the save function is called.
volunteerSchema.pre("save", async function (next) {
    const volunteer = this;

    // this code only hash the password if it has been modified or is new password, when there is an input to the password field.
    if (!volunteer.isModified("password")) {
        return next();
    }

    // generate a salt and hash the password using the salt
    // the salt is a random string that is added to the password before hashing it. this is to prevent rainbow table attacks.
    // the salt is stored in the database along with the hashed password.
    //rainbow table attack is a type of attack where the attacker has a list of pre-computed hashes and tries to match the hash of the password that they are trying to crack.
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(volunteer.password, salt);

        // replace the plaintext password with the hashed password and salt
        volunteer.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

volunteerSchema.methods.isValidPassword = async function (password) {
    const volunteer = this;
    return await bcrypt.compare(password, volunteer.password);
};

// create the Volunteer model based on the schema above and export it to be saved in the database.
const Volunteer = mongoose.model("volunteer", volunteerSchema);

// export the Volunteer model
export default Volunteer;
