const User = require("../models/users.model");

exports.search = async (req, res) => {
  try {
    const { query } = req.query;

    // Check if 'query' parameter is provided
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    // Use regex for case-insensitive partial matching of username
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    });

    // Check if any users were found
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found matching the query" });
    }

    // Return the matching users
    res.status(200).json({
      message: "Filtered users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
