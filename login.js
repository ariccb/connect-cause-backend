import jwt from "jsonwebtoken";
import Volunteer from "../models/volunteer.js";

// login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // check if the email exists in the database
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // check if the password is valid
    const isValidPassword = await volunteer.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create a JWT token
    // jwt token is a string that contains the payload and the signature of the token
    // the payload is the data that we want to store in the token
    // the signature is a hash of the token and a secret key
    // the signature is used to verify the token
    const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET);

    // return the token as a response
    // the token is stored in the browser's local storage
    // the token is sent to the server in the Authorization header
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
