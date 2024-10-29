// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    // Menggunakan console.error untuk mencatat error di server
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Bandingkan password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};
