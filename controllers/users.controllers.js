const jwt = require("jsonwebtoken");
const allUsername = require("./../mock/mockUser");
const mockFeeds = require("./../mock/mockFeeds");
const mockNotifications = require("./../mock/mockNotifications");

const User = require("../models/users.model"); // Assuming a User model for database interaction
const Post = require("../models/posts.model");

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
  if (username && username !== "null") {
    const results = allUsername.filter(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );

    if (results.length) {
      return res.status(200).json({
        status: 200,
        message: "Sucessfully got the username info",
        data: results[0],
      });
    } else {
      return res.status(401).json({
        error: "Not a valid username",
      });
    }
  } else {
    return res.status(401).json({ error: "Not a valid username" });
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

exports.createPost = async (userId, content, image) => {
  try {
    const newPost = new Post({
      author: userId,
      content,
      image,
    });
    await newPost.save();
    console.log("Post created successfully:", newPost);
  } catch (err) {
    console.error("Error creating post:", err);
  }
};

exports.getPostDetails = async (postId) => {
  try {
    const post = await Post.findById(postId)
      .populate("author", "fullName profilePicture") // Populate author's name and profile picture
      .populate("likes", "username") // Populate usernames of users who liked the post
      .populate("comments.user", "fullName"); // Populate commenter's name
    console.log("Post details:", post);
  } catch (err) {
    console.error("Error fetching post:", err);
  }
};

exports.getUserPosts = async (userId) => {
  try {
    const posts = await Post.find({ author: userId });
    console.log(`Posts by user ${userId}:`, posts);
  } catch (err) {
    console.error("Error fetching user's posts:", err);
  }
};
