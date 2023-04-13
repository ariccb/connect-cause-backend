import mongoose from "mongoose";

/** this is the schema for the matched interests between organizations and volunteers.
 * Only website Admins should be able to add to this list.
 */

const interestSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
});

const Interest = mongoose.model("interest", interestSchema); //this will show up on MongoDB on the "volunteers" collection
// interests will be the name of the collection on MongoDB
export default Interest;
