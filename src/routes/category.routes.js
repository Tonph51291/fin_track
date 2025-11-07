const express = require("express");
const router = express.Router();
const {
  addCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const { protect } = require("../middlewares/auth.middleware");
router.use(protect);
// Add new category
router.post("/", addCategory);

// Get all categories for authenticated user
router.get("/user", getCategoriesByUser);

// Update category
router.put("/:id", updateCategory);

// Delete category
router.delete("/:id", deleteCategory);

module.exports = router;
