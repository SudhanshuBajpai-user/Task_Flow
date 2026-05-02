const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // app password
  },
});

const sendMail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"TaskFlow" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = { sendMail };