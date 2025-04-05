const express = require("express");
const { googleAuth } = require("../../../controllers/authController");
const router = express.Router();

router.post("/social-google", googleAuth); // Ensure valid path and handler

module.exports = router;
