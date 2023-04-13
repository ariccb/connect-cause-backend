// this schema is for keeping records of the volunteering that volunteers have completed at different companies
import mongoose from "mongoose";

const volunteeringRecordsSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company", // this needs to reference the MODEL NAME of the schema that you're referencing
        required: true,
    },
    volunteer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Volunteer", // this needs to reference the MODEL NAME of the schema that you're referencing
        required: true,
    },
    matched_interests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Interest", // this needs to reference the MODEL NAME of the schema that you're referencing
            required: true,
        },
    ],
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
});

const VolunteeringRecord = mongoose.model("volunteeringRecord", volunteeringRecordsSchema); //companies is the name of the collection on MongoDB
export default VolunteeringRecord;
