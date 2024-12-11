const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/users.model"); // Assuming a User model for database interaction

const users = [
  {
    id: 1,
    username: "testuser",
    password: "$2y$10$N93J5i6KxIKlvqvnNenOTOc7QDHotx7ezVynexDRo0gk3S//oSSyy", // hashed version of "password123"
  },
  {
    id: 2,
    username: "thisisvishalpal",
    password: "vishal",
  },
  {
    id: 3,
    username: "perusrivastava",
    password: "peru",
  },
];

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user
    const user = await User.findOne({ username }); // Use Mongoose to query the database
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate JWT
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Access token expires in 1 hour
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // Refresh token expires in 7 days
    );

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ username: username, message: "Sign in successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
