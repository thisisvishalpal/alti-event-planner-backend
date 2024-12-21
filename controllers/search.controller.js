const User = require("../models/users.model");

exports.search = async (req, res) => {
  try {
    const { query, ...filters } = req.body; // Destructure query and other fields

    // If both `query` and filters are empty, return an error
    if (!query && Object.keys(filters).length === 0) {
      return res.status(400).json({
        error: "At least one filter or search query is required.",
      });
    }

    let searchQuery = {}; // Initialize the query object

    // If filters are provided, process them
    if (Object.keys(filters).length > 0) {
      const { age, gender, city, occupation, study, salary } = filters;

      // Age filter
      if (age) {
        const [minAge, maxAge] = age.split("-").map(Number);
        if (!isNaN(minAge) && !isNaN(maxAge)) {
          searchQuery.age = { $gte: minAge, $lte: maxAge };
        }
      }

      // Gender filter
      if (gender) {
        searchQuery.gender = gender;
      }

      // City filter
      if (city) {
        searchQuery.city = city;
      }

      // Occupation filter
      if (occupation) {
        searchQuery.occupation = occupation;
      }

      // Study filter
      if (study) {
        searchQuery.study = study;
      }

      // Salary filter
      if (salary) {
        const salaryRanges = {
          "0to10000": { $gte: 0, $lte: 10000 },
          "10000to25000": { $gte: 10000, $lte: 25000 },
          "25000to50000": { $gte: 25000, $lte: 50000 },
          "50000to100000": { $gte: 50000, $lte: 100000 },
          "100000plus": { $gte: 100000 },
        };
        if (salaryRanges[salary]) {
          searchQuery.salary = salaryRanges[salary];
        }
      }
    }

    // If `query` is provided, add regex search for the username
    if (query) {
      searchQuery.username = { $regex: query, $options: "i" };
    }

    // Execute the query to find users
    const users = await User.find(searchQuery).select(
      "username fullName profilePicture _id"
    );

    // If no users are found, return a 404 response
    if (users.length === 0) {
      return res.status(404).json({
        message: "No users found matching the provided filters or query.",
      });
    }

    // Return the filtered users
    res.status(200).json({
      success: true,
      message: "Filtered users fetched successfully.",
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
