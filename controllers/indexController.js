const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const blankMsg = "cannot be empty.";

const validateUser = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("First name " + blankMsg),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name " + blankMsg),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email " + blankMsg)
    .isEmail()
    .withMessage("Must be a valid email address."),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password " + blankMsg),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password " + blankMsg)
    .custom((value, { req }) => {
      const passwordMatch = value === req.body.password;
      if (!passwordMatch) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];

const generatePassword = (plainTextPassword) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(plainTextPassword, salt);
  return hash;
};

module.exports.getHome = (req, res, next) => {
  res.render("index");
};

module.exports.getSignUpForm = async (req, res, next) => {
  //const password = generatePassword("hello");
  //console.log(bcrypt.compareSync("hello", password));
  //console.log(req.session);
  res.render("sign-up");
};

module.exports.getLogInForm = async (req, res, next) => {
  res.render("log-in");
};

module.exports.createUser = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { firstname, lastname, email, password, is_member } = req.body;
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          await db.addUser(
            firstname,
            lastname,
            email,
            hashedPassword,
            is_member
          );
          res.redirect("/");
        }
      });
    } else {
      res.redirect("/");
    }
  },
];

module.exports.createLogIn = (req, res, next) => {};
