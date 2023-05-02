import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  //removed email and password from volunteer schema and moved it to "userSchema"
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
});

// create the Volunteer model based on the schema above and export it to be saved in the database.
let Admin = mongoose.model("admin", adminSchema);

// export the Volunteer model
export default Admin;
