const bcrypt = require("bcrypt");
const prisma = require("../prisma/client");
const { generateToken } = require("../utils/jwt");
const { validationResult } = require("express-validator");
const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");

const signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, firstName, lastName, phone } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
      },
    });

    const token = generateToken(user);
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
      token,
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(400)
        .json({ message: "Invalid password credentials, please try again" });

    const token = generateToken(user);
    res.send("Login successful");
    return res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Logout failed." });
  }
};

// REFRESH TOKEN
const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "No refresh token." });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken({ userId: decoded.userId });
    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(401).json({ error: "Invalid refresh token." });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    await sendPasswordResetEmail(user);

    return res.status(200).json({ message: "Password reset link sent." });
  } catch (error) {
    return res.status(500).json({ error: "Error sending reset email." });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    return res.status(400).json({ error: "Token and password required." });

  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashed },
    });

    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token." });
  }
};

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token is required." });

  try {
    const decoded = jwt.verify(token, process.env.EMAIL_VERIFICATION_SECRET);
    await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: true },
    });

    return res.status(200).json({ message: "Email verified successfully." });
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token." });
  }
};

// VERIFY PHONE (e.g., using OTP service or mock)
const verifyPhone = async (req, res) => {
  const { userId, code } = req.query;
  if (!userId || !code)
    return res.status(400).json({ error: "User ID and code required." });

  try {
    // For production: validate OTP from SMS gateway
    await prisma.user.update({
      where: { id: userId },
      data: { phoneVerified: true },
    });

    return res.status(200).json({ message: "Phone number verified." });
  } catch (error) {
    return res.status(500).json({ error: "Phone verification failed." });
  }
};

// GOOGLE AUTH (controller-based)
// const googleAuth = async (req, res) => {
//   // To be filled (handle tokenId or OAuth flow)
//   return res.status(200).json({ message: "Google auth placeholder" });
// };

// // FACEBOOK AUTH (controller-based)
// const facebookAuth = async (req, res) => {
//   // To be filled (handle accessToken or OAuth flow)
//   return res.status(200).json({ message: "Facebook auth placeholder" });
// };

module.exports = {
  signup,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyPhone,
  //   googleAuth,
  //   facebookAuth,
};
