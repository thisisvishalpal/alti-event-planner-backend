const express = require("express");
const router = express.Router();
const isAuth = require("./../middlewares");
const { followUser } = require("./../controllers/connection.controller");

router.post("/follow", isAuth, followUser);

module.exports = router;
