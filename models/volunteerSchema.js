import mongoose from "mongoose";

/** this is the schema for the volunteers that sign up
 * to our application.
 */

const volunteerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    // Aric working on this
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
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
            type: String,
            required: false,
            enum: [
                // lets you have pre-determined options
                "animals", //just putting in some examples of pre-selectable options right now
                "refugee-aid",
                "community-service",
                "international-aid-relief",
            ],
        },
        // add password (encrypted) as part of the schema - look up what package to install
    ],
});

const Volunteer = mongoose.model("volunteer", volunteerSchema); //this will show up on MongoDB on the "volunteers" collection
// users_collection is the name of the collection on MongoDB
export default Volunteer;
