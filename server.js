// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const eventRoutes = require("./routes/events");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
// Middleware
app.use(bodyParser.json());
// app.use(express.static("public"));
app.options("*", cors()); // Handle preflight requests
app.use(
  cors({
    origin: ["http://localhost:3000", "https://alti-event-planner.vercel.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the events online booking 🚀");
});

app.use("/events", eventRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Listening on Port" + port);
});
