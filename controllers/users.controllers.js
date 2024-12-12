const jwt = require("jsonwebtoken");
// var Events = require("./../models/events.model");
const allUsername = require("./../mock/mockUser");
const mockFeeds = require("./../mock/mockFeeds");
const mockNotifications = require("./../mock/mockNotifications");

const User = require("../models/users.model"); // Assuming a User model for database interaction

exports.userInfo = async (req, res) => {
  const { username } = req.query;
  const token = req.cookies?.accessToken;

  console.log(token, "from username info api");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded?.username === username) {
        const user = await User.findOne({ username });

        return res.status(200).json({
          message: "User authenticated",
          data: user,
        });
      }
    } catch (err) {
      console.error("Invalid or expired token", err);
      return res
        .status(401)
        .json({ error: "Invalid or expired token, please sign in again" });
    }
  }
  if (username) {
    const results = allUsername.filter(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (results.length) {
      return res.json({
        status: 200,
        message: "Sucessfully got the username info",
        data: results[0],
      });
    } else {
      return res.json({
        status: 404,
        message: "Not a valid username",
        data: ["not a valid username"],
      });
    }
  } else {
    return res.json({
      status: 404,
      message: "Not a valid username",
      data: ["not a valid username"],
    });
  }
};

// if (username === "thisisvishalpal") {
//   return res.json({
//     status: 200,
//     message: "Sucessfully got all the events",
//     data: thisisvishalpal,
//   });
// } else {
//   return res.json({
//     status: 404,
//     message: "Not a valid username",
//     data: ["not a valid username"],
//   });
// }

exports.userSearch = (req, res) => {
  const { query } = req.query;
  const users = [
    {
      id: 1,
      name: "Alice Johnson",
      username: "alicej",
      profilePicture: "https://via.placeholder.com/50",
      mutualConnections: 10,
    },
    {
      id: 2,
      name: "Bob Smith",
      username: "bobsmith",
      profilePicture: "https://via.placeholder.com/50",
      mutualConnections: 5,
    },
    {
      id: 3,
      name: "Rahul Singh Baghel",
      username: "rahulsinghbaghel",
      profilePicture: "https://via.placeholder.com/50",
      mutualConnections: 99,
    },
    {
      id: 4,
      name: "Sagar Sahu",
      username: "sagarsahu",
      profilePicture: "https://via.placeholder.com/50",
      mutualConnections: 33,
    },
    {
      id: 5,
      name: "Veena Pal",
      username: "veenapal",
      profilePicture: "https://via.placeholder.com/50",
      mutualConnections: 44,
    },
    {
      id: 6,
      name: "Prerna Srivastava",
      username: "perusrivastava",
      profilePicture: "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
      mutualConnections: 0,
    },
  ];

  const results = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.username.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
};

exports.userFeeds = (req, res) => {
  const { query } = req.query;
  console.log(query, "query userFeeds");

  res.json({
    status: 200,
    message: "Sucessfully got the user feeds",
    data: mockFeeds,
  });
};

exports.userNotifications = (req, res) => {
  const { query } = req.query;
  console.log(query, "query userNotifications");

  res.json({
    status: 200,
    message: "Sucessfully got the user feeds",
    data: mockNotifications,
  });
};
