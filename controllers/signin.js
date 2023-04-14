import jwt from "jsonwebtoken";

// login function
export async function signInVolunteer(req, res) {
    const { email, password } = req.body;
    console.log("Attempting to Login a volunteer");

    try {
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
        const token = jwt.sign({ id: volunteer._id }, process.env.JWT_SECRET);

        // return the token as a response
        return res.status(200).json({
            message: `Successfully logged in ${volunteer.username}`,
            token: token,
            response: volunteer,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
