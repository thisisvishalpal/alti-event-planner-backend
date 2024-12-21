const mockFeeds = require("./../mock/mockFeeds");
const mockNotifications = require("./../mock/mockNotifications");

const User = require("../models/users.model"); // Assuming a User model for database interaction
const Post = require("../models/posts.model");

exports.userInfo = async (req, res) => {
  const { username } = req.query;

  if (req.isAdmin) {
    try {
      return res.status(200).json({
        message: "User authenticated",
        data: req.user,
      });
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Invalid or expired token, please sign in again" });
    }
  }
  if (!req.isAdmin) {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username, Not found!" });
    }

    if (user) {
      return res.status(200).json({
        status: 200,
        message: "Sucessfully got the username info",
        data: user,
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

exports.userConnections = async (req, res) => {
  const currentUserId = req.user._id;

  try {
    const user = await User.findById(currentUserId)
      .select("followers following _id")
      .populate({
        path: "followers",
        select: "username fullName profilePicture _id", // Fields to include in followers
      })
      .populate({
        path: "following",
        select: "username fullName profilePicture _id", // Fields to include in following
      });

    return res.status(200).json({
      message: "User authenticated",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Facing some issue while fetching connections",
    });
  }
};
