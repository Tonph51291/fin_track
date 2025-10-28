const express = require("express");
const router = express.Router();
const {
  addCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

// Add new category
router.post("/", addCategory);

// Get all categories by user
router.get("/user/:userId", getCategoriesByUser);

// Update category
router.put("/:id", updateCategory);

// Delete category
router.delete("/:id", deleteCategory);

module.exports = router;
