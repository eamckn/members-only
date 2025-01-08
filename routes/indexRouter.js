const indexRouter = require("express").Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getHome);
indexRouter.get("/sign-up", indexController.getSignUpForm);
indexRouter.post("/sign-up", indexController.createUser);

module.exports = { indexRouter };
