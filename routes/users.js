const express = require("express");
const router = express.Router();

const {
  userInfo,
  userFeeds,
  userNotifications,
  createPost,
  getPostDetails,
  getUserPosts,
  userConnections,
} = require("./../controllers/users.controllers");

const isAuth = require("./../middlewares");
const isAdmin = require("./../middlewares/isAdmin");

router.get("/info", isAuth, isAdmin, userInfo);
router.get("/feeds", isAuth, userFeeds);
router.get("/notifications", isAuth, userNotifications);

router.post("/posts", isAuth, createPost);
router.post("/posts", isAuth, getPostDetails);
router.post("/posts", isAuth, getUserPosts);

// router.get('/messages',userMessages)
router.get("/connections", isAuth, userConnections);

// router.get("/settings", getSettings);
// router.post("/settings", postSettings);

module.exports = router;
