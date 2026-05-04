const crypto = require("crypto");
const User = require("../models/User");
const VerificationToken = require("../models/EmailAndPassword");
const { sendMail } = require("../utils/mailer");

const sendVerification = async (req, res) => {
  try {
    const email = req.body.email || req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }
    await VerificationToken.deleteMany({ userId: user._id });

    const token = crypto.randomBytes(32).toString("hex");

    await VerificationToken.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 20 * 60 * 1000),
    });

    const link = `http://localhost:5173/verify-email/${token}`;

    await sendMail({
      to: user.email,
      subject: "Verify your email",
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify your email:</p>
        <a href="${link}">Verify Email</a>
      `,
    });

    res.status(200).json({ message: "Verification email sent" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { sendVerification };