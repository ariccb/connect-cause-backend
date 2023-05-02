import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

// login function
export async function login(req, res) {
    const { email, password } = req.body;
    console.log("Attempting to Login a volunteer");

    try {
        // check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // check if the email exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // check if the password is valid
        const isValidPassword = await user.isValidPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // create a JWT token
        // jwt token is a string that contains the payload and the signature of the token
        // the payload is the data that we want to store in the token
        // the signature is a hash of the token and a secret key
        // the signature is used to verify the token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // return the token as a response
        // the token is stored in the browser's local storage
        // the token is sent to the server in the Authorization header
        console.log("signin ran, this is the token:", token);
        return res.status(200).json({
            message: `Successfully logged in ${user.firstName}, ${user.lastName}`,
            token: token,
            response: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
