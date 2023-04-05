import Volunteer from "../models/volunteerSchema.js";
import mongoose from "mongoose";
const isValidId = mongoose.Types.ObjectId.isValid;

export async function getAllVolunteers(req, res) {
    console.log(`Attempting to GET list of all volunteers.`);

    try {
        const volunteerList = await Volunteer.find();
        res.status(200).json(volunteerList);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getVolunteer = async (req, res) => {
    console.log("Attempting to GET specific volunteer");
    const { _id } = req.params;
    if (!isValidId(_id)) {
        return res.status(404).send(`No volunteer found with _id: ${_id}`);
    }
    try {
        const retrievedVolunteer = await Volunteer.findById(_id);
        if (retrievedVolunteer == null) {
            return res.status(404).json({
                message: `Couldn't find a volunteer with id: ${_id}`,
            });
        } else {
            return res.status(200).json({
                message: `Found volunteer ${_id}`,
                response: retrievedVolunteer,
            });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export async function createVolunteer(req, res) {
    console.log(`Attempting to create new volunteer`);

    const { email, username, first_name, last_name } = req.body;

    console.log(
        `Request body: \nemail:${email}\nusername:${username}\nfirst_name:${first_name}\nlast_name:${last_name}\n`
    );
    try {
        const existingVolunteerEmail = await Volunteer.findOne({ email: email });
        const existingVolunteerUsername = await Volunteer.findOne({ username: username });

        if (existingVolunteerUsername) {
            return res.status(403).json({
                message:
                    "Account already exists with that username. Please try again with a different one.",
            }); //forbidden - volunteer exists already
        } else if (existingVolunteerEmail) {
            return res.status(403).json({
                message:
                    "Account already exists with that email. Please try again with a different one.",
            }); //forbidden - volunteer exists already
        } else {
            //create new volunteer if they don't have a login already
            const newVolunteer = await Volunteer.create({
                email,
                username,
                first_name,
                last_name,
                created_at: new Date().toISOString(),
            });
            const newVolunteerId = newVolunteer._id;

            res.status(201).json({
                message: "Successfully added a new volunteer.",
                result: await Volunteer.findOne({ _id: newVolunteerId }),
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong when trying to create new volunteer.",
        });
    }
}

export async function updateVolunteer(req, res) {
    console.log(`Trying to update a volunteer.`);
    const { _id } = req.params;
    const { email, username, first_name, last_name, created_at } = req.body;

    console.log(`Attempting to update volunteer with _id: ${_id}`);
    try {
        const updatedVolunteer = await Volunteer.findByIdAndUpdate(
            _id,
            {
                email,
                username,
                first_name,
                last_name,
                created_at,
                updated_at: new Date().toISOString(),
            },
            {
                new: true, // I believe if this doesn't find an existing volunteer to update, it creates a new one
            }
        );
        const updatedVolunteerId = updatedVolunteer._id;
        res.status(200).json({
            message: "Successfully updated a new volunteer.",
            result: await Volunteer.findOne({ _id: updatedVolunteerId }).populate({
                path: "sessions_played",
                model: "game_sessions_collection",
                populate: {
                    path: "game",
                    model: "games_collection",
                },
            }),
        });
    } catch (error) {
        res.json({
            message: `Something went wrong when trying to update the volunteer with _id: ${_id}`,
        });
    }
}

export async function patchVolunteer(req, res) {
    console.log(`Trying to patch a volunteer.`);
    const { _id } = req.params;
    const volunteerPatch = req.body;

    console.log(`Attempting to update volunteer with _id: ${_id}`);

    if (!isValidId(_id)) {
        return res.status(404).send(`No volunteer found with _id: ${_id}`);
    }
    try {
        console.log("attempting patch volunteer");
        await Volunteer.findByIdAndUpdate(_id, {
            ...volunteerPatch,
            updated_at: new Date().toISOString(),
        });
        const volunteerUpdated = await Volunteer.findById(_id);
        res.json({
            message: `Updated volunteer (id:${_id}).`,
            updated: { volunteerPatch },
            result: { volunteerUpdated },
        });
    } catch (error) {
        res.json({
            message: `Something went wrong when trying to patch the volunteer with _id: ${_id}`,
        });
    }
}
export async function deleteVolunteer(req, res) {
    console.log("Trying to delete a volunteer");
    const { _id } = req.params;

    console.log(`Attempting to delete volunteer with _id: ${_id}`);

    if (!isValidId(_id)) {
        return res.status(404).send(`No volunteer found with _id: ${_id}`);
    }
    try {
        const result = await Volunteer.findByIdAndDelete(_id);
        res.json({
            message: "Deleted volunteer",
            result: result,
        });
    } catch (err) {
        console.log(err);
    }
}
