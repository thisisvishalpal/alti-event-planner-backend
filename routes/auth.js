const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/users.model"); // Assuming a User model for database interaction

const {
  signup,
  validateToken,
  logout,
} = require("./../controllers/auth.controller");
const { signin } = require("./../controllers/signin.controller");

const inputShortSanitize = [
  body("fullName").notEmpty().withMessage("Full Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email is already in use");
    }),
  body("username")
    .optional()
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric")
    .custom(async (username) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) throw new Error("Username is already in use");
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

const inputLongSanitize = [
  body("phoneNumber")
    .matches(/^\d{10}$/)
    .withMessage("Phone Number must be 10 digits"),
  body("city").notEmpty().withMessage("City is required"),
  body("age")
    .isInt({ min: 18 })
    .withMessage("You must be at least 18 years old"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("study").notEmpty().withMessage("Study field is required"),
  body("occupation").notEmpty().withMessage("Occupation is required"),
  body("married")
    .isIn(["yes", "no"])
    .withMessage("Marital status must be 'yes' or 'no'"),
];

const doShortSanitize = true;
const sanitize = doShortSanitize
  ? inputShortSanitize
  : [...inputShortSanitize, ...inputLongSanitize];

router.post("/signin", signin);
router.post("/signup", sanitize, signup);
router.post("/logout", logout);
router.get("/auth-check", validateToken);

module.exports = router;
