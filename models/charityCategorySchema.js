import mongoose from "mongoose";

/** this is the schema for the matched interests between companies and volunteers.
 * Only website Admins should be able to add to this list.
 */

const charityCategorySchema = new mongoose.Schema({
  categoryCode: {
    type: String,
    required: true,
    unique: true,
  },
  charityType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    unique: true,
  },
});

const CharityCategory = mongoose.model("charity-categories", charityCategorySchema); //this will show up on MongoDB on the "volunteers" collection
// interests will be the name of the collection on MongoDB
export default CharityCategory;

export const createCharityCategory = async (newCategory) => {
  try {
    console.log("trying to create charity category");
    const createdCategory = await CharityCategory.create(newCategory);
    return createdCategory;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Duplicate Error");
    } else {
      throw error;
    }
  }
};
