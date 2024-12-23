const express = require("express");
const router = express.Router();
const isAuth = require("./../middlewares");
const { search } = require("./../controllers/search.controller");

router.post("/person", isAuth, search);

module.exports = router;
