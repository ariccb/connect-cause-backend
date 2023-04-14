import jwt from "jsonwebtoken";
import Volunteer from "../models/volunteer.js";

export async function signUpVolunteer(req, res) {
    console.log(`Attempting to create new volunteer`);

    const { first_name, last_name, username, email, password } = req.body;
    // hash the password here
    // password = hashed password
    console.log(
        `Request body: \nemail:${email}\nusername:${username}\nfirst_name:${first_name}\nlast_name:${last_name}\n`
    );
    try {
        const existingVolunteerByEmail = await Volunteer.findOne({ email: email });
        const existingVolunteerByUsername = await Volunteer.findOne({ username: username });

        if (existingVolunteerByUsername) {
            return res.status(403).json({
                message:
                    "Account already exists with that username. Please try again with a different one.",
            }); //forbidden - volunteer exists already
        } else if (existingVolunteerByEmail) {
            return res.status(403).json({
                message:
                    "Account already exists with that email. Please try again with a different one.",
            }); //forbidden - volunteer exists already
        } else {
            //create new volunteer if they don't have a login already
            const newVolunteer = await Volunteer.create({
                first_name,
                last_name,
                username,
                email,
                password, // need to hash this
                created_at: new Date().toISOString(),
            });
            const newVolunteerId = newVolunteer._id;

            // create a JWT token
            const token = jwt.sign({ id: newVolunteer._id }, process.env.JWT_SECRET);

            res.status(201).json({
                message: "Successfully added a new volunteer.",
                token: token,
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
