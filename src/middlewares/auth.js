const { verifyToken } = require("../utils/jwt");
const prisma = require("../prisma/client");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect };
// This middleware checks if the user is authenticated by verifying the JWT token in the request headers. If the token is valid, it retrieves the user from the database and attaches it to the request object. If not, it sends a 401 Unauthorized response.
// This is useful for protecting routes that require authentication, such as accessing user-specific data or performing actions that require a logged-in user.
// The `protect` middleware can be used in your route handlers to ensure that only authenticated users can access certain endpoints.
