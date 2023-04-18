import jwt from "jsonwebtoken";
import Volunteer from "../models/volunteerSchema.js";

export async function signUpVolunteer(req, res) {
    console.log(`Attempting to create new volunteer`);
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    console.log(`Request body: \nemail:${email}\nfirstName:${firstName}\nlastName:${lastName}\n`);
    try {
        const existingVolunteerByEmail = await Volunteer.findOne({ email: email });
        console.log(`existingVolunteerByEmail`, existingVolunteerByEmail);
        if (existingVolunteerByEmail) {
            return res.status(400).json({
                message: "Account already exists with that email. Please try again with a different one.",
            }); //forbidden - volunteer exists already
        } else {
            console.log("trying to create new volunteer");
            //create new volunteer if they don't have a login already
            const newVolunteer = await Volunteer.create({
                firstName,
                lastName,
                email,
                password, // hashing happens as a pre-hook on Volunteer.create(in the schema)
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
            message: error,
        });
    }
}

export async function signUpCompany(req, res) {
    console.log(`Attempting to create new company`);
    console.log(req.body);
    const { firstName, lastName, email, password } = req.body;

    console.log(`Request body: \nemail:${email}\nfirstName:${firstName}\nlastName:${lastName}\n`);
    try {
        const existingCompanyByEmail = await Company.findOne({ email: email });
        console.log(`existingCompanyByEmail`, existingCompanyByEmail);
        if (existingCompanyByEmail) {
            return res.status(400).json({
                message: "Account already exists with that email. Please try again with a different one.",
            }); //forbidden - company exists already
        } else {
            console.log("trying to create new company");
            //create new company if they don't have a login already
            const newCompany = await Company.create({
                companyName,
                email,
                password, // hashing happens as a pre-hook on Company.create(in the schema)
                created_at: new Date().toISOString(),
            });
            const newCompanyId = newCompany._id;
            // create a JWT token
            const token = jwt.sign({ id: newCompany._id }, process.env.JWT_SECRET);
            res.status(201).json({
                message: "Successfully added a new company.",
                token: token,
                result: await Company.findOne({ _id: newCompanyId }),
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
        });
    }
}
