// // routes/auth/refresh-token.js
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const prisma = require("../../prisma/client");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   const token = req.cookies.refreshToken;
//   if (!token) return res.status(401).json({ error: "Refresh token missing" });

//   try {
//     const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.userId },
//     });

//     if (!user) return res.status(401).json({ error: "Invalid refresh token" });

//     const accessToken = jwt.sign(
//       { userId: user.id, role: user.role },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "15m" }
//     );

//     return res.status(200).json({ accessToken });
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid or expired refresh token" });
//   }
// });

// module.exports = router;

const express = require("express");
const { refreshToken } = require("../../controllers/authController");

const router = express.Router();
router.post("refresh-token", refreshToken);

module.exports = router;
