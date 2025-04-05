const express = require("express");
const { verifyToken } = require("../../utils/jwt");
const router = express.Router();

router.post("/verify-token", verifyToken);

module.exports = router;
