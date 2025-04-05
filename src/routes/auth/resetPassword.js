// // routes/auth/reset-password.js
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const prisma = require("../../prisma/client");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   const { token, newPassword } = req.body;

//   if (!token || !newPassword) {
//     return res.status(400).json({ error: "Missing token or password" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
//     const hashed = await bcrypt.hash(newPassword, 10);

//     await prisma.user.update({
//       where: { id: decoded.userId },
//       data: { password: hashed },
//     });

//     return res.status(200).json({ message: "Password updated successfully" });
//   } catch (err) {
//     return res.status(400).json({ error: "Invalid or expired token" });
//   }
// });

// module.exports = router;

const express = require("express");
const { resetPassword } = require("../../controllers/authController");
const router = express.Router();

router.post("/reset-password", resetPassword);

module.exports = router;
