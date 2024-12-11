const express = require("express");
const router = express.Router();

const { userInfo, userSearch } = require("./../controllers/users.controllers");

router.get("/username", userInfo);
router.get("/search", userSearch);

module.exports = router;
