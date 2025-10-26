const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

// Register new user
router.post("/register", register);

// Login
router.post("/login", login);

// Get user info
router.get("/:id", getUserInfo);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;
