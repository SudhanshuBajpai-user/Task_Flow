// models/VerificationToken.js
const mongoose = require("mongoose");

const EmailAndPassword = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  token: {
    type: String,
    required: true,
  },

  expiresAt: new Date(Date.now() + 20 * 60 * 1000),
}, { timestamps: true });

module.exports = mongoose.model("VerificationToken", EmailAndPassword);