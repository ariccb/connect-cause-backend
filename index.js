import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import volunteerRouter from "./routes/volunteerRouter.js";

//read the MongoDB credentials from .env file
dotenv.config({
    path: "./.env",
});

const connectionStr = process.env.MONGO_URL;

async function main() {
    try {
        const db = await mongoose.connect(connectionStr);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // exit the process with an error code
    }
}

// Call the main function to connect to MongoDB
main().catch((err) => console.log(err));

// Create a new instance of the Express app
const app = express();
const PORT = process.env.PORT || 9000;

// Set up middleware to parse incoming requests as JSON
app.use(express.json());

// Set up a basic home route
app.get("/", (req, res) => {
    res.send("You reached the home endpoint for ConnectCause!.\n");
});

// Set up routes for the /volunteers endpoint using the volunteerRouter module
app.use("/volunteers", volunteerRouter);

// Start the server listening on the specified port
app.listen(PORT, () => {
    console.log(`The server is up and running on PORT: ${PORT}`);
    console.log(`Click here to view the main endpoint: http://localhost:${PORT}\n`);
});
