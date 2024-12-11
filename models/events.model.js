var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// var Any = mongoose.Schema.Types.Mixed;

// Define collection and schema for Items
var Events = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      unique: true,
    },
    owner_id: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      unique: true,
    },
    payload: {
      type: Object,
      required: true,
      unique: true,
    },
    published_at: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "events",
  }
);

module.exports = mongoose.model("Events", Events);
