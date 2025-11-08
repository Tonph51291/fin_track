const express = require("express");
const router = express.Router();
const {
  addSalary,
  getSalariesByUser,
  getSalaryByMonth,
  updateSalary,
  deleteSalary,
} = require("../controllers/salary.controller");

const { protect } = require("../middlewares/auth.middleware");

// Protect all routes
router.use(protect);

// Add new salary
router.post("/", addSalary);

// Get all salaries by user
router.get("/user", getSalariesByUser);

// Get salary by month and year
router.get("/user/:month/:year", getSalaryByMonth);

// Update salary
router.put("/:id", updateSalary);

// Delete salary
router.delete("/:id", deleteSalary);

module.exports = router;
