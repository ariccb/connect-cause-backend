export const isAuthenticated = (req, res, next) => {
  console.log("isAuth");
  console.log("req.user", req.user);
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};

// would like to be able to check that the currently logged in user is accessing endpoints they're allowed to based on their user._id
export const isCurrentUser = (req, res, next) => {
  console.log("isCurrentUser");
  console.log("req.user._id", req.user._id);
  if (req.user._id == req.body.user._id) {
    //req.user here is coming from passport. req.body._id would be from my request object from the fetch request from the frontend
    next();
  } else {
    res.sendStatus(401);
  }
};

export const isAdmin = (req, res, next) => {
  console.log("isAdmin");
  console.log("req.user.modelType", req.user.modelType);
  if (req.user.modelType == "Admin") {
    // you need to be logged in as an Admin account to get to the next callback
    next();
  } else res.sendStatus(401);
};

export const isCompany = (req, res, next) => {
  console.log("isCompany");
  console.log("req.user.modelType", req.user.modelType);
  if (req.user.modelType == "Company") {
    // you need to be logged in as an Admin account to get to the next callback
    next();
  } else res.sendStatus(401);
};
export const isVolunteer = (req, res, next) => {
  console.log("isVolunteer");
  console.log("req.user.modelType", req.user.modelType);
  if (req.user.modelType == "Volunteer") {
    // you need to be logged in as an Admin account to get to the next callback
    next();
  } else res.sendStatus(401);
};
