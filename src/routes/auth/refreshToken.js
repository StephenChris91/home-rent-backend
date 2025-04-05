const express = require("express");
const { refreshToken } = require("../../controllers/authController");

const router = express.Router();
router.post("/refresh-token", refreshToken);

module.exports = router;
