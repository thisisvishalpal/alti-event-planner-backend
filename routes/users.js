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

const validateUserByCookie = require("./../middlewares");

router.get("/info", validateUserByCookie, userInfo);
router.get("/feeds", validateUserByCookie, userFeeds);
router.get("/notifications", validateUserByCookie, userNotifications);

router.post("/posts", validateUserByCookie, createPost);
router.post("/posts", validateUserByCookie, getPostDetails);
router.post("/posts", validateUserByCookie, getUserPosts);

// router.get('/messages',userMessages)
// router.get("/connections", userConnections);

// router.get("/settings", getSettings);
// router.post("/settings", postSettings);

module.exports = router;
