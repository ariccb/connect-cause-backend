import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import Volunteer from "../models/volunteerSchema.js";
import Company from "../models/companySchema.js";
import Admin from "../models/adminSchema.js";

export async function signup(req, res) {
  console.log(`Attempting to create new user`);
  const { email, password, modelType } = req.body;

  console.log(`Request body:  \nemail:${email},\npassword:${password},\nmodelType:${modelType},`);
  try {
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).json({
        message: "Account already exists with that email. Please try again with a different one.",
      }); //forbidden - user exists already
    } else {
      let userTypeId;
      //create new user if they don't have a login already
      if (modelType == "Company") {
        let newCompany = await Company.create({});
        console.log(newCompany);
        userTypeId = newCompany._id;
      } else if (modelType == "Volunteer") {
        let newVolunteer = await Volunteer.create({});
        console.log(newVolunteer);
        userTypeId = newVolunteer._id;
      } else if (modelType == "Admin") {
        let newVolunteer = await Admin.create({});
        console.log(newVolunteer);
        userTypeId = newVolunteer._id;
      }

      console.log("trying to create new user");
      let newUser = await User.create({
        email: email,
        password: password, // hashing happens as a pre-hook on User.create(in the schema)
        userType: userTypeId,
        modelType: modelType || "Volunteer",
        // created_at: new Date().toISOString(),
      });
      console.log(newUser);
      //   const user = await User.findOne({ email });
      //   console.log(user);

      const payload = {
        _id: newUser._id,
        userType: newUser.modelType,
        // userType: user.userType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      // create a JWT token
      res.cookie("authToken", token);
      res.status(201).json({
        message: "Successfully added a new user.",
        token: token,
        result: await User.findOne({ _id: newUser._id }),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
}
