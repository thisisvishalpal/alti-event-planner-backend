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

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      default: "This user has not added a number yet",
    },
    city: { type: String, default: "Gwalior", trim: true },
    state: { type: String, default: "Madhya Pradesh", trim: true },
    bio: {
      type: String,
      default: "This user has not added a bio yet.",
      maxlength: 300,
    },
    profilePicture: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    age: { type: Number, min: 18 },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    study: {
      type: String,
      enum: ["10", "12", "graduation", "diploma", "engineer"],
      default: "10",
    },
    occupation: {
      type: String,
      enum: ["government", "private", "business", "other", "nothing"],
      default: "other",
    },
    married: { type: String, enum: ["yes", "no"], default: "no" },
    username: { type: String, unique: true, sparse: true, trim: true },
    password: { type: String, required: true },
    userUUID: { type: String, unique: true },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to other users following this user
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to users this user is following
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post", // Reference to posts created by this user
      },
    ],
    postCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);

// const userSchema = new mongoose.Schema({
//   fullName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phoneNumber: {
//     type: String,
//     default: "This user has not added a number yet",
//   },
//   city: { type: String, default: "Gwalior" },
//   state: { type: String, default: "Madhya Pradesh" },
//   bio: { type: String, default: "This user has not added a bio yet." },
//   followers: { type: Number, default: 0 },
//   following: { type: Number, default: 0 },
//   profilePicture: {
//     type: String,
//     default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
//   },
//   age: { type: Number, default: 0 },
//   gender: { type: String, default: "Male" },
//   study: { type: String, default: "10th" },
//   occupation: { type: String },
//   married: { type: String },
//   username: { type: String, unique: true, sparse: true },
//   password: { type: String, required: true },
//   userUUID: { type: String },
// });

// module.exports = mongoose.model("User", userSchema);
