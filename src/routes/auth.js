// api/auth/authRoutes.js
const express = require("express");
const router = express.Router();

// Import individual route handlers
const login = require("./auth/login");
const register = require("./auth/register");
const logout = require("./auth/logout");
const refreshToken = require("./auth/refreshToken");
const forgotPassword = require("./auth/forgotPassword");
const resetPassword = require("./auth/resetPassword");
const verifyEmail = require("./auth/verifyEmail");
const verifyPhone = require("./auth/verifyPhone");
const googleAuth = require("./auth/social/google");
const facebookAuth = require("./auth/social/facebook");
const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");

// Wire them to paths
router.use("/login", login);
router.use("/register", register);
router.use("/logout", logout);
router.use("/refresh-token", refreshToken);
router.use("/forgot-password", forgotPassword);
router.use("/reset-password", resetPassword);
router.use("/verify-email", verifyEmail);
router.use("/send-password-reset-email", sendPasswordResetEmail);
router.use("/verify-phone", verifyPhone);
router.use("/social/google", googleAuth);
router.use("/social/facebook", facebookAuth);

module.exports = router;
