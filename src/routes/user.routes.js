const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserInfo,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

// Register new user
router.post("/register", register);

// Login
router.post("/login", login);

// Get user info
router.get("/:id", protect, getUserInfo);

// Update user
router.put("/:id", protect, updateUser);

// Delete user
router.delete("/:id", protect, deleteUser);

module.exports = router;
