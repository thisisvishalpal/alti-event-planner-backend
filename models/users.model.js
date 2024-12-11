const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: { type: String, required: true },
//   city: { type: String, required: true },
//   age: { type: Number, required: true },
//   gender: { type: String, required: true },
//   study: { type: String, required: true },
//   occupation: { type: String, required: true },
//   married: { type: String, required: true },
//   username: { type: String, unique: true, sparse: true },
//   password: { type: String, required: true },
// });
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String },
  city: { type: String },
  age: { type: Number },
  gender: { type: String },
  study: { type: String },
  occupation: { type: String },
  married: { type: String },
  username: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  userUUID: { type: String },
});

module.exports = mongoose.model("User", userSchema);
