const indexRouter = require("express").Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");

indexRouter.get("/", indexController.getHome);
indexRouter.get("/sign-up", indexController.getSignUpForm);
indexRouter.post("/sign-up", indexController.createUser);
indexRouter.get("/log-in", indexController.getLogInForm);
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);
indexRouter.get("/success", indexController.getSuccessfulLogIn);
indexRouter.get("/failure", indexController.getFailedLogIn);
indexRouter.get("/log-out", indexController.logOut);

module.exports = { indexRouter };
