const express = require("express");
const { verifyPhone } = require("../../controllers/authController");

const router = express.Router();
router.post("/verify-phone", verifyPhone);

module.exports = router;
