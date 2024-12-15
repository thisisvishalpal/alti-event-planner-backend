const express = require("express");
const router = express.Router();

const {
  userInfo,
  userFeeds,
  userNotifications,
  createPost,
  getPostDetails,
  getUserPosts,
} = require("./../controllers/users.controllers");

router.get("/info", userInfo);
router.get("/feeds", userFeeds);
router.get("/notifications", userNotifications);

router.post("/posts", createPost);
router.post("/posts", getPostDetails);
router.post("/posts", getUserPosts);

// router.get('/messages',userMessages)
// router.get("/connections", userConnections);

// router.get("/settings", getSettings);
// router.post("/settings", postSettings);

module.exports = router;
