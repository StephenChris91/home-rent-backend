// api/auth/authRoutes.js
const express = require("express");
const router = express.Router();

// Ensure all imported modules are valid
const login = require("./auth/login");
const register = require("./auth/register");
const logout = require("./auth/logout");
const refreshToken = require("./auth/refreshToken");
const forgotPassword = require("./auth/forgotPassword");
const resetPassword = require("./auth/resetPassword");
const verifyEmail = require("./auth/verifyEmail");
const verifyPhone = require("./auth/verifyPhone");
// const googleAuth = require("./auth/social/google");
// const facebookAuth = require("./auth/social/facebook");

// Wire them to paths
router.use("/login", login); // Valid path
router.use("/register", register); // Valid path
router.use("/logout", logout);
router.use("/refresh-token", refreshToken);
router.use("/forgot-password", forgotPassword);
router.use("/reset-password", resetPassword);
router.use("/verify-email", verifyEmail);
router.use("/verify-phone", verifyPhone);

// Ensure these are valid routers or middleware functions
// router.use("/social-google", googleAuth);
// router.use("/social-facebook", facebookAuth);

module.exports = router;
