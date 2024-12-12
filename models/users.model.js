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
  phoneNumber: {
    type: String,
    default: "This user has not added a number yet",
  },
  city: { type: String, default: "Gwalior" },
  state: { type: String, default: "Madhya Pradesh" },
  bio: { type: String, default: "This user has not added a bio yet." },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  profilePicture: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  posts: { type: Array, default: [] },
  age: { type: Number, default: 0 },
  gender: { type: String, default: "Male" },
  study: { type: String, default: "10th" },
  occupation: { type: String },
  married: { type: String },
  username: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  userUUID: { type: String },
});

module.exports = mongoose.model("User", userSchema);
