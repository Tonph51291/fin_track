const express = require("express");
const router = express.Router();
const {
  addSalary,
  getSalariesByUser,
  getSalaryByMonth,
  updateSalary,
  deleteSalary,
} = require("../controllers/salary.controller");

// Add new salary
router.post("/", addSalary);

// Get all salaries by user
router.get("/user/:userId", getSalariesByUser);

// Get salary by month and year
router.get("/user/:userId/:month/:year", getSalaryByMonth);

// Update salary
router.put("/:id", updateSalary);

// Delete salary
router.delete("/:id", deleteSalary);

module.exports = router;
