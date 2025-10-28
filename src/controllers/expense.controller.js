const addExpense = (req, res) => {
  res.json({ message: "Add new expense successfully" });
};

const getExpensesByUser = (req, res) => {
  res.json({ message: "Get all expenses by user", userId: req.params.userId });
};

const getExpensesByMonth = (req, res) => {
  res.json({
    message: "Get expenses by month and year",
    userId: req.params.userId,
    month: req.params.month,
    year: req.params.year,
  });
};

const getExpenseSummary = (req, res) => {
  res.json({
    message: "Get expense summary",
    userId: req.params.userId,
    month: req.params.month,
    year: req.params.year,
    total: 0,
    comparison: "Below salary",
  });
};

const updateExpense = (req, res) => {
  res.json({ message: "Update expense successfully", id: req.params.id });
};

const deleteExpense = (req, res) => {
  res.json({ message: "Delete expense successfully", id: req.params.id });
};

module.exports = {
  addExpense,
  getExpensesByUser,
  getExpensesByMonth,
  getExpenseSummary,
  updateExpense,
  deleteExpense,
};
