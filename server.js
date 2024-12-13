// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { testCookies } = require("./controllers/cookies.controller");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
// app.use(express.static("public"));
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://alti-event-planner.vercel.app"],
    credentials: true,
  })
);
app.options("*", cors()); // Handle preflight requests

app.get("/", (req, res) => {
  res.send("Welcome to the events online booking 🚀");
});

app.use("/events", eventRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/test-cookies", testCookies);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening on Port" + port);
});
