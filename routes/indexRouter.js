const indexRouter = require("express").Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");
const auth = require("../routes/authMiddleware");

// GET routes
indexRouter.get("/", indexController.getHome);
indexRouter.get("/sign-up", indexController.getSignUpForm);
indexRouter.get("/log-in", auth.isLoggedIn, indexController.getLogInForm);
indexRouter.get("/success", indexController.getSuccessfulLogIn);
indexRouter.get("/failure", indexController.getFailedLogIn);
indexRouter.get("/log-out", auth.isAuth, indexController.logOut);
indexRouter.get("/member", auth.isNotMember, indexController.getNewMemberForm);
indexRouter.get("/new-message", auth.isAuth, indexController.getNewMessageForm);

// POST routes
indexRouter.post("/sign-up", indexController.createUser);
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  })
);
indexRouter.post("/member", indexController.updateMembership);
indexRouter.post("/new-message", indexController.createMessage);
indexRouter.post("/delete", indexController.deleteMessage);

module.exports = { indexRouter };
