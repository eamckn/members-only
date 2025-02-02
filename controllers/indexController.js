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

module.exports.getHome = async (req, res, next) => {
  const messages = await db.getMessages();
  res.render("index", { messages: messages });
};

module.exports.getSignUpForm = async (req, res, next) => {
  res.render("sign-up");
};

module.exports.getLogInForm = async (req, res, next) => {
  res.render("log-in");
};

module.exports.getSuccessfulLogIn = (req, res, next) => {
  res.render("successfulLogIn");
};

module.exports.getFailedLogIn = (req, res, next) => {
  res.render("failedLogIn");
};

module.exports.getNewMemberForm = (req, res, next) => {
  res.render("member");
};

module.exports.getNewMessageForm = (req, res, next) => {
  res.render("new-message");
};

module.exports.updateMembership = async (req, res, next) => {
  if (req.body.secret === process.env.MEMBER_PASSWORD) {
    const { id } = req.user;
    await db.updateMembership(id);
    res.render("memberSuccess");
  } else {
    res.render("memberFailure");
  }
};

module.exports.createUser = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { firstname, lastname, email, password, member, admin } = req.body;
      const is_admin = admin === "true" ? true : false;
      const is_member = is_admin === true ? true : member;
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        } else {
          await db.addUser(
            firstname,
            lastname,
            email,
            hashedPassword,
            is_member,
            is_admin
          );
          res.redirect("/log-in");
        }
      });
    } else {
      res.redirect("/");
    }
  },
];

module.exports.createMessage = async (req, res, next) => {
  const date = new Date();
  const { message } = req.body;
  const { id } = req.user;
  await db.addMessage(date, message, id);
  res.redirect("/");
};

module.exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      res.redirect("/");
    }
  });
};

module.exports.deleteMessage = async (req, res, next) => {
  const { message_id } = req.body;
  console.log(message_id);
  await db.deleteMessage(message_id);
  res.redirect("/");
};
