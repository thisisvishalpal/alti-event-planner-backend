const express = require("express");
const router = express.Router();

const { getAllEvents } = require("./../controllers/events.controllers");

router.get("/getAllEvents", getAllEvents);

module.exports = router;
