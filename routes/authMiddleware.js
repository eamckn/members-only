module.exports.isNotMember = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.is_member) {
    next();
  } else {
    return res
      .status(401)
      .send("You're either already a member or not signed in.");
  }
};

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).send("You are not logged in.");
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(401).send("You are already logged in");
  } else {
    next();
  }
};
