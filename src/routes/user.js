const express = require("express");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  const user = req.user;
  res.json(user);
});

module.exports = router;
// This route handler retrieves the authenticated user's information and sends it back in the response. It uses the `protect` middleware to ensure that only authenticated users can access this endpoint. The user information is obtained from the request object, which was populated by the middleware.
// This is useful for allowing users to view their profile information or settings after logging in. The route is defined as a GET request to the `/me` endpoint, which is a common convention for retrieving the current user's data in RESTful APIs.
