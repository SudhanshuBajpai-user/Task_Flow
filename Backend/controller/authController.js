const User = require("../models/User");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    if (!existingUser.isVerified) {
      return res.status(403).json({
        message: "Email not verified",
        email: existingUser.email,
      });
    }

    req.session.userId = existingUser._id;

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }

      res.status(200).json({
        message: "Login successful",
        user: {
          name: existingUser.name,
          email: existingUser.email,
        },
      });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};


const cookie = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified",
        email: user.email,
      });
    }

    res.status(200).json({
      message: "User exists",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        message: "Logout failed",
      });
    }

    res.clearCookie("connect.sid");
    res.json({
      message: "Logged out successfully",
    });
  });
};

const userDetails = async (req, res) => {
  try {
    // 🔐 Check session
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // 🔍 Find user
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      avatar: user.avatar || null,
    });
  } catch (err) {
    console.error("USER DETAILS ERROR:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = { signup, login, cookie, logout, userDetails };
