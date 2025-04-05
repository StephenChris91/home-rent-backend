// You’d also need a GET route to handle the token verification:
// router.get("/confirm", async (req, res) => {
//   const { token } = req.query;

//   try {
//     const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
//     await prisma.user.update({
//       where: { id: decoded.userId },
//       data: { emailVerified: true },
//     });
//     res.redirect(`${process.env.CLIENT_URL}/verified-success`);
//   } catch {
//     res.redirect(`${process.env.CLIENT_URL}/verified-failed`);
//   }
// });

// module.exports = router;

const express = require("express");
const { verifyToken } = require("../../utils/jwt");
const router = express.Router();

router.post("verify-token", verifyToken);

module.exports = router;
