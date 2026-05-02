const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const app = express();
const PORT =  process.env.PORT || 5000;
const SECRET = "mysecretkey";
require("dotenv").config();
// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 MongoDB Connection


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Error:", err));


// 🔹 User Schema + Model
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});
// 🔹 Signup API
app.post("/signup", async (req, res) => {
  try {
    console.log(req.body); // 🔥 check incoming data

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json({ message: "User created" });

  } catch (err) {
    console.log(err); // 🔥 IMPORTANT
    res.status(500).json({ message: "Server error" });
  }
});


// 🔹 Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 🔒 Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // 🔑 Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
});


// 🔹 Protected Route Example
app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const verified = jwt.verify(token, SECRET);
    res.json({ message: "Protected data", user: verified });
  } catch {
    res.status(400).json({ message: "Invalid token" });
  }
});


// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});