// // routes/auth/verify-email.js
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const prisma = require("../../prisma/client");
// const nodemailer = require("nodemailer");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { email } = req.body;

//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user) return res.status(404).json({ error: "User not found" });

//   const token = jwt.sign(
//     { userId: user.id },
//     process.env.EMAIL_VERIFICATION_SECRET,
//     { expiresIn: "30m" }
//   );
//   const link = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//   });

//   await transporter.sendMail({
//     from: `"Your App" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: "Verify Your Email",
//     html: `<p>Click <a href="${link}">here</a> to verify your email address.</p>`,
//   });

//   return res.status(200).json({ message: "Verification email sent" });
// });

const express = require("express");
const { verifyEmail } = require("../../controllers/authController");
const router = express.Router();

router.post("verify-email", verifyEmail);

module.exports = router;
