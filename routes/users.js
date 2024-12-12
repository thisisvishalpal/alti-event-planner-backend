const express = require("express");
const router = express.Router();

const {
  userInfo,
  userSearch,
  userFeeds,
  userNotifications,
} = require("./../controllers/users.controllers");

router.get("/username", userInfo);
router.get("/search", userSearch);
router.get("/feeds", userFeeds);
router.get("/notifications", userNotifications);

module.exports = router;
