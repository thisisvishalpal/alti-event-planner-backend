const express = require("express");
const router = express.Router();

const {
  userInfo,
  userFeeds,
  userNotifications,
} = require("./../controllers/users.controllers");

router.get("/info", userInfo);
router.get("/feeds", userFeeds);
router.get("/notifications", userNotifications);

// router.get("/posts", userPosts);
// router.post('/posts',userPosts)

// router.get('/messages',userMessages)
// router.get("/connections", userConnections);

// router.get("/settings", getSettings);
// router.post("/settings", postSettings);

module.exports = router;
