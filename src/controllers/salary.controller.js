const addSalary = (req, res) => {
  res.json({ message: "Add new salary successfully" });
};

const getSalariesByUser = (req, res) => {
  res.json({ message: "Get all salaries by user", userId: req.params.userId });
};

const getSalaryByMonth = (req, res) => {
  res.json({
    message: "Get salary by month and year",
    userId: req.params.userId,
    month: req.params.month,
    year: req.params.year,
  });
};

const updateSalary = (req, res) => {
  res.json({ message: "Update salary successfully", id: req.params.id });
};

const deleteSalary = (req, res) => {
  res.json({ message: "Delete salary successfully", id: req.params.id });
};

module.exports = {
  addSalary,
  getSalariesByUser,
  getSalaryByMonth,
  updateSalary,
  deleteSalary,
};
