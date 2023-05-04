import initialData from "./charityCategories.json" assert { type: "json" };
import { createCharityCategory } from "./charityCategorySchema.js";
import User from "./userSchema.js";
import Admin from "./adminSchema.js";

export const loadInitialData = async (res, req) => {
  for (let i = 0; i < initialData.length; i++) {
    const categoryObj = initialData[i];
    try {
      console.log(`creating category ${categoryObj.category}`);
      const newCategory = await createCharityCategory(categoryObj);
      console.log("newCategory", newCategory);
      console.log(`created category ${newCategory.category} with id ${newCategory._id}`);
    } catch (err) {
      console.log(`error creating category ${categoryObj.category}`);
      console.log(err.message);
    }
  }

  console.log("trying to create new user");
  let userTypeId;
  //create new user if they don't have a login already

  let newAdmin = await Admin.create({});
  console.log(newAdmin);
  userTypeId = newAdmin._id;

  let newUser = await User.create({
    email: "admin@admin.ca",
    password: "admin", // hashing happens as a pre-hook on User.create(in the schema)
    userType: userTypeId,
    modelType: "Admin",
    // created_at: new Date().toISOString(),
  });

  console.log("created user:\n", newUser);
  console.log("finished loading initial data");
};
