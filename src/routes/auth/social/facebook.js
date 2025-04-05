const express = require("express");
const { facebookAuth } = require("../../../controllers/authController");
const router = express.Router();

router.post("/social-facebook", facebookAuth); // Ensure valid path and handler

module.exports = router;
