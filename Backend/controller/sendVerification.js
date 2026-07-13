const crypto = require("crypto");
const User = require("../models/User");
const VerificationToken = require("../models/VerificationToken");
const { sendMail } = require("../utils/mailer");

const sendVerification = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Already verified" });
    }
    await VerificationToken.deleteMany({ userId: user._id });

    const token = crypto.randomBytes(32).toString("hex");

    console.log("Creating token...");

    await VerificationToken.create({
      userId: user._id,
      token,
      expiresAt: new Date(Date.now() + 20 * 60 * 1000),
    });

  const link = `${process.env.FRONTEND_URL}/verify-email/${token}`;

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

const verificationLink = async (req, res) => {
  console.log("VERIFY ROUTE HIT:", req.params.token);

  try {
    const token = req.params.token.trim();

    const tokenDoc = await VerificationToken.findOne({ token });

    if (!tokenDoc) {
      return res.status(400).send("Invalid link");
    }

    const user = await User.findById(tokenDoc.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.isVerified = true;
    await user.save();

    req.session.userId = user._id;

    // 🔥 THIS WAS MISSING
    return res.status(200).json({
      message: "Email verified successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { sendVerification, verificationLink };
