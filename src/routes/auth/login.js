const express = require("express");
const { login } = require("../../controllers/authController");
const router = express.Router();

router.post("/", login); // Ensure no duplicate or malformed paths

module.exports = router;
