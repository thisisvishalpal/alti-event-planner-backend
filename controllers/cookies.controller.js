exports.testCookies = (req, res) => {
  const accessToken = req.cookies.accessToken; // Read the accessToken from cookies
  if (!accessToken) {
    return res.status(400).json({ error: "No accessToken cookie found" });
  }

  try {
    // Optionally verify the token using JWT
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    res.status(200).json({
      message: "Cookie found and verified",
      decodedToken,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
