const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  token: String,
  expiresAt: {
  type: Date,
  required: true,
  expires: 1200,
}
  },
  { timestamps: true },
);

module.exports = mongoose.model("VerificationToken", schema);
