const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});
console.log("EMAIL_USER:", process.env.EMAIL_USER || process.env.EMAIL);
console.log("PASS:", process.env.EMAIL_PASS);
const sendMail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: `"TaskFlow" <${process.env.EMAIL_USER || process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
};

module.exports = { sendMail };