const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
var { v4: uuidv4 } = require("uuid");

const router = express.Router();
const User = require("../models/users.model"); // Assuming a User model for database interaction

// var Events = require("./../models/events.model");
const thisisvishalpal = require("./../mock/mockUser");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const SALT_ROUNDS = 10;

// POST /auth/signup
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    fullName,
    email,
    phoneNumber,
    city,
    age,
    gender,
    study,
    occupation,
    married,
    username,
    password,
  } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create a new user in the database
    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      city,
      age,
      gender,
      study,
      occupation,
      married,
      username,
      password: hashedPassword,
      userUUID: uuidv4(),
    });

    await newUser.save();

    // Generate a JWT
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

exports.logout = (req, res) => {
  console.log(req.body, "body");
  const { username, password } = req.body;

  if (username === "thisisvishalpal" && password === "vishal") {
    return res.json({
      status: 200,
      message: "Logged in succesfully",
      data: thisisvishalpal,
    });
  } else {
    return res.json({
      status: 404,
      message: "Not a valid username",
      data: "not a valid username",
    });
  }
};

exports.validateToken = (req, res) => {
  console.log(req.body, "body");
  const { username, password } = req.body;

  if (username === "thisisvishalpal" && password === "vishal") {
    return res.json({
      status: 200,
      message: "Logged in succesfully",
      data: thisisvishalpal,
    });
  } else {
    return res.json({
      status: 404,
      message: "Not a valid username",
      data: "not a valid username",
    });
  }
};

// will implement this shit
// const hashedPassword = await bcrypt.hash(password, 10);
// exports.signup = (req, res) => {
//   console.log(req.body, "body");

//   const { username, password } = req.body;

//   if (username === "thisisvishalpal" && password === "vishal") {
//     return res.json({
//       status: 200,
//       message: "Logged in succesfully",
//       data: thisisvishalpal,
//     });
//   } else {
//     return res.json({
//       status: 404,
//       message: "Not a valid username",
//       data: "not a valid username",
//     });
//   }
// };
