const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
var { v4: uuidv4 } = require("uuid");

const User = require("../models/users.model"); // Assuming a User model for database interaction
const thisisvishalpal = require("./../mock/mockUser");

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
    const accessToken = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
      },
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
