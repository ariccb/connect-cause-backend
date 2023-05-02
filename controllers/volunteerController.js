import Volunteer from "../models/volunteerSchema.js";
import mongoose from "mongoose";
const isValidId = mongoose.Types.ObjectId.isValid;

export async function getAllVolunteers(req, res) {
  console.log(`Attempting to GET list of all volunteers.`);

  try {
    const volunteerList = await Volunteer.find();
    res.status(200).json(volunteerList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const getVolunteer = async (req, res) => {
  console.log("Attempting to GET specific volunteer");
  const { _id } = req.params;
  if (!isValidId(_id)) {
    return res.status(404).send(`No volunteer found with _id: ${_id}`);
  }
  try {
    const retrievedVolunteer = await Volunteer.findById(_id);
    if (retrievedVolunteer == null) {
      return res.status(404).json({
        message: `Couldn't find a volunteer with id: ${_id}`,
      });
    } else {
      return res.status(200).json({
        message: `Found volunteer ${_id}`,
        response: retrievedVolunteer,
      });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export async function patchVolunteer(req, res) {
  console.log(`Trying to patch a volunteer.`);
  const { _id } = req.params;
  const volunteerPatch = req.body;

  console.log(`Attempting to update volunteer with _id: ${_id}`);

  if (!isValidId(_id)) {
    return res.status(404).send(`No volunteer found with _id: ${_id}`);
  }
  try {
    console.log("attempting patch volunteer");
    await Volunteer.findByIdAndUpdate(_id, {
      ...volunteerPatch,
      updated_at: new Date().toISOString(),
    });
    const volunteerUpdated = await Volunteer.findById(_id);
    res.json({
      message: `Updated volunteer (id:${_id}).`,
      updated: { volunteerPatch },
      result: { volunteerUpdated },
    });
  } catch (error) {
    res.json({
      message: `Something went wrong when trying to patch the volunteer with _id: ${_id}`,
    });
  }
}

export async function deleteVolunteer(req, res) {
  console.log("Trying to delete a volunteer");
  const { _id } = req.params;

  console.log(`Attempting to delete volunteer with _id: ${_id}`);

  if (!isValidId(_id)) {
    return res.status(404).send(`No volunteer found with _id: ${_id}`);
  }
  try {
    const result = await Volunteer.findByIdAndDelete(_id);
    res.json({
      message: "Deleted volunteer",
      result: result,
    });
  } catch (err) {
    console.log(err);
  }
}
