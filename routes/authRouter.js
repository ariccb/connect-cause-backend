import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import { verifyPassword } from "../models/userSchema.js";
import { signup } from "../controllers/signup.js";

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

router.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("authenticated", req.user);
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  req.logOut((err) => {
    if (!err) res.sendStatus(200);
  });
});

router.post("/signup", signup);

router.get("/", (req, res) => {
  //artificially slowing down this request to see loading screen
  setTimeout(() => {
    if (req.user) res.send(req.user);
    else res.sendStatus(401);
  }, 2000);
});

export default router;
