const isAdmin = async (req, res, next) => {
  try {
    const { username } = req.query;
    const user = req.user;
    if (!username) {
      return res
        .status(401)
        .json({ error: "Username is missing, please try with username" });
    }

    req.isAdmin = username === user.username;
    next();
  } catch (err) {
    console.error("Error validating token:", err);
    return res
      .status(401)
      .json({ error: "Invalid or expired token, please sign in again" });
  }
};

module.exports = isAdmin;
