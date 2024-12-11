var Events = require("./../models/events.model");
const events = require("./../mock/index");

//controller to get all the events
exports.getAllEvents = (req, res) => {
  return res.json({
    status: 200,
    message: "Sucessfully got all the events",
    data: events,
  });
};
