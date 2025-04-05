const express = require("express");
const { forgotPassword } = require("../../controllers/authController");

const router = express.Router();

router.post("/forgot-password", forgotPassword);

module.exports = router;
