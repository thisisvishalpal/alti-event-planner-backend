const jwt = require("jsonwebtoken");
const User = require("./../models/users.model"); // Adjust the path to your User model

const validateUserByCookie = async (req, res, next) => {
  try {
    // Step 1: Get the token from cookies
    const token = req.cookies?.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Access token is missing, please sign in" });
    }

    // Step 2: Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Step 3: Find the user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token, user not found" });
    }

    // Step 4: Attach user information to the request object
    req.user = user;
    console.log("yes its working", user);

    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    console.error("Error validating token:", err);
    return res
      .status(401)
      .json({ error: "Invalid or expired token, please sign in again" });
  }
};

module.exports = validateUserByCookie;
