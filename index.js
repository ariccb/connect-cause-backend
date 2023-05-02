import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import volunteerRouter from "./routes/volunteerRouter.js";
import companyRouter from "./routes/companyRouter.js";
import authRouter from "./routes/authRouter.js";
import bodyParser from "body-parser";
import { loadInitialData } from "./models/loadInitialCategories.js";
// import companyRouter from "./routes/companyRouter.js";

//read the MongoDB credentials from .env file
dotenv.config({
  path: "./auth/.env",
});

const connectionStr = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(connectionStr);
}
main().catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 9000;

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));

//assigning the connection setup
export const db = await mongoose.connect(connectionStr);

app.use(express.json()); // this tells our express app that we expect to be receiving json values.
app.use("*", (req, res, next) => {
  console.log("path is", req.originalUrl);
  next();
});

// app.use(bodyParser.json());
//---- example json value being passed with curl as a post request:
// curl -d '{"a":"hello","b":"bye"}
// app.use(express.urlencoded() // another option to tell express app that we expect to be receiving url encoded values.(which usually come from online forms)
//---- example urlencoded value being passed with curl as a post request:
// curl =d "param1=value1&param2=value2" -X POST http://localhost:4444/aaa\?foo\=bar\&fred\=barney

app.get("/api", (req, res) => {
  res.send("You reached the home endpoint for ConnectCause!.\n");
});

// list of the Routes i'm using
app.use("/api/user", userRouter); // all the functionality to do with volunteers
app.use("/api/volunteer", volunteerRouter); // all the functionality to do with volunteers
app.use("/api/company", companyRouter); // all the functionality to do with volunteers
app.use("/api/authenticate", authRouter);
app.post("/api/l-i-d", loadInitialData);
// app.use("api/opportunities", )

// Start the server listening on the specified port
app.listen(PORT, () => {
  console.log(`The server is up and running on PORT: ${PORT}`);
  console.log(`Click here to view the main endpoint: http://localhost:${PORT}\n`);
});
