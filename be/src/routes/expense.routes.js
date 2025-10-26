const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpensesByUser,
  getExpensesByMonth,
  getExpenseSummary,
  updateExpense,
  deleteExpense,
} = require("../controllers/expense.controller");

// Add new expense
router.post("/", addExpense);

// Get all expenses by user
router.get("/user/:userId", getExpensesByUser);

// Get expenses by month and year
router.get("/user/:userId/:month/:year", getExpensesByMonth);

// Get expense summary
router.get("/summary/:userId/:month/:year", getExpenseSummary);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);

module.exports = router;
