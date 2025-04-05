// routes/auth/forgot-password.js
const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("../../prisma/client");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const token = jwt.sign(
    { userId: user.id },
    process.env.RESET_PASSWORD_SECRET,
    { expiresIn: "15m" }
  );
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP config
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. Link expires in 15 minutes.</p>`,
  });

  return res.status(200).json({ message: "Password reset email sent" });
});

module.exports = router;
