const User = require("../models/users.model");

exports.followUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body; // The ID of the user to follow
    const currentUserId = req.user._id; // The ID of the logged-in user (assumed to be extracted from auth middleware)

    console.log(userIdToFollow, currentUserId, "from here both");
    // Validate that the userIdToFollow is provided
    if (!userIdToFollow) {
      return res.status(400).json({
        success: false,
        message: "User to follow is required.",
      });
    }

    // Check if the user is trying to follow themselves
    if (userIdToFollow === currentUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself.",
      });
    }

    // Fetch the user to follow and the current user
    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User to follow does not exist.",
      });
    }

    // Check if the current user already follows the target user
    if (currentUser.following.includes(userIdToFollow)) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user.",
      });
    }

    // Update followers and following lists
    userToFollow.followers.push(currentUserId);
    currentUser.following.push(userIdToFollow);

    // Save the updates
    await userToFollow.save();
    await currentUser.save();

    res.status(200).json({
      success: true,
      message: `You are now following ${userToFollow.username}.`,
      data: {
        userToFollow: {
          _id: userToFollow._id,
          username: userToFollow.username,
          fullName: userToFollow.fullName,
        },
        currentUser: {
          _id: currentUser._id,
          username: currentUser.username,
          fullName: currentUser.fullName,
        },
      },
    });
  } catch (err) {
    console.error("Error following user:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
