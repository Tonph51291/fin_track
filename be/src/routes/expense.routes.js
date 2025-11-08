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

const { protect } = require("../middlewares/auth.middleware");

router.use(protect);
// Add new expense
router.post("/", addExpense);

// Get all expenses for authenticated user
router.get("/user", getExpensesByUser);

// Get expenses by month and year for authenticated user
router.get("/user/:month/:year", getExpensesByMonth);

// Get expense summary for authenticated user
router.get("/summary/:month/:year", getExpenseSummary);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);

module.exports = router;
