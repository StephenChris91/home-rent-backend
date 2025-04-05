const express = require("express");
const { verifyEmail } = require("../../controllers/authController");
const router = express.Router();

router.post("/verify-email", verifyEmail);

module.exports = router;
