import express from "express";

import Volunteer from "../models/volunteerSchema.js";
import Company from "../models/companySchema.js";
import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";
import { verifyPassword } from "../models/userSchema.js";

const router = express.Router();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async function (email, password, done) {
      console.log("runningLocalStrategy");
      const user = await verifyPassword(email, password);
      if (!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  console.log("serialized");
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserialized");
  process.nextTick(function () {
    return cb(null, user);
  });
});

async function signup(req, res) {
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
      if (modelType == "company") {
        let newCompany = await Company.create({});
        console.log(newCompany);
        userTypeId = newCompany._id;
      } else if (modelType == "volunteer") {
        let newVolunteer = await Volunteer.create({});
        console.log(newVolunteer);
        userTypeId = newVolunteer._id;
      } else if (modelType == "admin") {
        let newAdmin = await Admin.create({});
        console.log(newAdmin);
        userTypeId = newAdmin._id;
      }

      console.log("trying to create new user");
      let newUser = await User.create({
        email: email,
        password: password, // hashing happens as a pre-hook on User.create(in the schema)
        userType: userTypeId,
        modelType: modelType,
        // created_at: new Date().toISOString(),
      });
      const userObject = await User.findById(newUser._id).populate("userType");
      console.log("userObject created, trying to populate: ", userObject);
      //   const user = await User.findOne({ email });
      //   console.log(user);
      res.status(200).json({
        message: `Successfully created new User with modelType ${modelType}`,
        result: userObject,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }
}

router.post("/login", passport.authenticate("local"), async (req, res) => {
  // const userModel = getUserDetails(req.user.modelType);
  // console.log("getting the userModel for the current user: \n", userModel);
  console.log("req.user._id.toString(): ", req.user._id.toString());
  console.log("req.user.modelType: ", req.user.modelType);
  console.log("req.user.userType: ", req.user.userType);

  const userObject = await User.findById(req.user._id.toString()).populate("userType");
  console.log("trying to use populate on the userType for the current user: \n", userObject);
  console.log("authenticated", req.user);
  console.log(req.user);

  // const userTypeDetails = getUserDetails(req.user.modelType, req.user.userType);
  res.send({
    message: "Successfully logged in, userObject sent as response body.",
    user: userObject,
  });
});

router.post("/signup", signup, passport.authenticate("local"), async (req, res) => {
  const userTypeDetails = getUserDetails(req.user.modelType, req.user.userType);
  res.send({
    userType: userTypeDetails,
    user: req.user,
  });
});

router.post("/logout", (req, res) => {
  req.logOut((err) => {
    if (!err) res.sendStatus(200);
  });
});
router.get("/", (req, res) => {
  //artificially slowing down this request to see loading screen
  setTimeout(() => {
    if (req.user) res.send(req.user);
    else res.sendStatus(401);
  }, 2000);
});

router.get("/", (req, res) => {
  //artificially slowing down this request to see loading screen
  setTimeout(() => {
    if (req.user) res.send(req.user);
    else res.sendStatus(401);
  }, 2000);
});

export default router;
