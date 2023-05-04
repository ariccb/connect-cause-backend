import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "modelType", // this lets us reference two separate schema types from one variable, "userTypes"
    required: false,
  },
  modelType: { type: String, enum: ["volunteer", "company", "admin"], required: true }, //the model types allowed for userTypes to reference
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

// this code hash the password before saving it to the database. this is a middleware function that will run before the save function is called.
// this is a pre hook. this code will run before the save function is called.
userSchema.pre("save", async function (next) {
  let user = this;

  // this code only hash the password if it has been modified or is new password, when there is an input to the password field.
  if (!user.isModified("password")) {
    return next();
  }

  // generate a salt and hash the password using the salt
  // the salt is a random string that is added to the password before hashing it. this is to prevent rainbow table attacks.
  // the salt is stored in the database along with the hashed password.
  //rainbow table attack is a type of attack where the attacker has a list of pre-computed hashes and tries to match the hash of the password that they are trying to crack.
  try {
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(user.password, salt);

    // replace the plaintext password with the hashed password and salt
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (password) {
  let user = this;
  return await bcrypt.compare(password, user.password);
};

let User = mongoose.model("user", userSchema);

export default User;

export async function getAllUsers(req, res) {
  console.log(`Attempting to GET list of all volunteers.`);

  try {
    const userList = await User.find();
    res.status(200).json(userList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const verifyPassword = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (user && bcrypt.compareSync(password, user.password)) {
    console.log("running verifyPassword function");
    const userData = user.toObject();
    console.log(userData);
    delete userData.password;
    return userData;
  } else {
    return null;
  }
};
