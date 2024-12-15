const express = require("express");
const router = express.Router();
const validateUserByCookie = require("./../middlewares");
const { search } = require("./../controllers/search.controller");

router.get("/person", validateUserByCookie, search);

module.exports = router;
