const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = new Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000, // Limit post content to 2000 characters
      default: "This user has not added any content.",
    },
    image: {
      type: String, // URL of the image
      default: null,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to users who liked the post
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the commenting user
          required: true,
        },
        comment: {
          type: String,
          required: true,
          maxlength: 1000, // Limit comment content
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    mentions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Users mentioned in the post
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "followers"],
      default: "public",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = model("Post", PostSchema);
