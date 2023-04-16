import jwt from "jsonwebtoken";
import Volunteer from "../models/volunteerSchema.js";

export async function signUpVolunteer(req, res) {
    console.log(`Attempting to create new volunteer`);
    console.log(req.body);
    const { first_name, last_name, username, email, password } = req.body;
    // hash the password here
    // password = hashed password
    console.log(`Request body: \nemail:${email}\nusername:${username}\nfirst_name:${first_name}\nlast_name:${last_name}\n`);
    try {
        const existingVolunteerByEmail = await Volunteer.findOne({ email: email });
        console.log(`existingVolunteerByEmail`, existingVolunteerByEmail);
        if (existingVolunteerByEmail) {
            return res.status(400).json({
                message: "Account already exists with that email. Please try again with a different one.",
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
            console.log("before jwt");
            // create a JWT token
            const token = jwt.sign({ id: newVolunteer._id }, process.env.JWT_SECRET);
            console.log(token);
            res.status(201).json({
                message: "Successfully added a new volunteer.",
                token: token,
                result: await Volunteer.findOne({ _id: newVolunteerId }),
            });
            console.log("after");
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}
