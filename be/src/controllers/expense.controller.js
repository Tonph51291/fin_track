const Expense = require("../models/expense.model");
const Category = require("../models/category.model");
const Salary = require("../models/salary.model");
const mongoose = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { sendSuccess, throwError } = require("../utils/response.helper");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Add new expense
const addExpense = asyncHandler(async (req, res, next) => {
  const userId = req.user && req.user._id;
  const { categoryId, amount, date, description } = req.body;

  // basic validation
  if (!userId || !categoryId || amount === undefined || !date) {
    return throwError(
      next,
      "Vui lòng cung cấp categoryId, amount và date.",
      400
    );
  }

  if (!isValidObjectId(userId) || !isValidObjectId(categoryId)) {
    return throwError(next, "userId hoặc categoryId không hợp lệ.", 400);
  }

  const parsedAmount = Number(amount);
  if (Number.isNaN(parsedAmount) || parsedAmount < 0) {
    return throwError(next, "Số tiền phải là số không âm.", 400);
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return throwError(next, "Date không hợp lệ.", 400);
  }

  // check category exists and belongs to user
  const category = await Category.findById(categoryId);
  if (!category) return throwError(next, "Danh mục không tồn tại.", 404);
  if (category.user_id.toString() !== userId.toString()) {
    return throwError(next, "Danh mục không thuộc về user này.", 403);
  }

  const expense = await Expense.create({
    user_id: userId,
    category_id: categoryId,
    amount: parsedAmount,
    description: description || "",
    date: parsedDate,
  });

  sendSuccess("Thêm chi tiêu thành công", res, { expense }, 201);
});

// Get all expenses by user
const getExpensesByUser = asyncHandler(async (req, res, next) => {
  const userId = req.user && req.user._id;
  if (!userId || !isValidObjectId(userId))
    return throwError(next, "userId không hợp lệ.", 400);

  const expenses = await Expense.find({ user_id: userId })
    .populate("category_id")
    .sort({ date: -1 });

  sendSuccess("Lấy danh sách chi tiêu thành công", res, { expenses });
});

// Get expenses by month and year
const getExpensesByMonth = asyncHandler(async (req, res, next) => {
  const userId = req.user && req.user._id;
  const { month, year } = req.params;

  if (!userId || !isValidObjectId(userId))
    return throwError(next, "userId không hợp lệ.", 400);
  const m = Number(month);
  const y = Number(year);
  if (!Number.isInteger(m) || m < 1 || m > 12 || !Number.isInteger(y)) {
    return throwError(next, "Tháng hoặc năm không hợp lệ.", 400);
  }

  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 1);

  const expenses = await Expense.find({
    user_id: userId,
    date: { $gte: start, $lt: end },
  })
    .populate("category_id")
    .sort({ date: -1 });

  sendSuccess("Lấy chi tiêu theo tháng thành công", res, { expenses });
});

// Get expense summary for month/year and compare with salary
const getExpenseSummary = asyncHandler(async (req, res, next) => {
  const userId = req.user && req.user._id;
  const { month, year } = req.params;

  if (!userId || !isValidObjectId(userId))
    return throwError(next, "userId không hợp lệ.", 400);

  const m = Number(month);
  const y = Number(year);
  if (!Number.isInteger(m) || m < 1 || m > 12 || !Number.isInteger(y)) {
    return throwError(next, "Tháng hoặc năm không hợp lệ.", 400);
  }

  const start = new Date(y, m - 1, 1);
  const end = new Date(y, m, 1);

  const agg = await Expense.aggregate([
    {
      $match: {
        user_id: new mongoose.Types.ObjectId(userId), // ✅ fix here
        date: { $gte: start, $lt: end },
      },
    },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const total = agg.length ? agg[0].total : 0;

  const salary = await Salary.findOne({ user_id: userId, month: m, year: y });

  let comparison = "Không có bản ghi lương";
  let salaryAmount = null;
  let percentOfSalary = null;

  if (salary) {
    salaryAmount = salary.amount;
    percentOfSalary =
      salary.amount > 0
        ? Math.round((total / salary.amount) * 10000) / 100
        : null; // percent with 2 decimals
    comparison =
      total <= salary.amount ? "Below or equal salary" : "Above salary";
  }

  sendSuccess("Lấy tổng chi tiêu thành công", res, {
    total,
    salary: salaryAmount,
    percentOfSalary,
    comparison,
  });
});

// Update expense
const updateExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return throwError(next, "id không hợp lệ.", 400);

  const { amount, description, date, categoryId } = req.body;

  const expense = await Expense.findById(id);
  if (!expense) return throwError(next, "Không tìm thấy khoản chi.", 404);

  // ownership check
  if (expense.user_id.toString() !== req.user._id.toString()) {
    return throwError(next, "Không có quyền cập nhật khoản chi này.", 403);
  }

  if (categoryId) {
    if (!isValidObjectId(categoryId))
      return throwError(next, "categoryId không hợp lệ.", 400);
    const cat = await Category.findById(categoryId);
    if (!cat) return throwError(next, "Danh mục không tồn tại.", 404);
    expense.category_id = categoryId;
  }

  if (amount !== undefined) {
    const parsed = Number(amount);
    if (Number.isNaN(parsed) || parsed < 0)
      return throwError(next, "Số tiền không hợp lệ.", 400);
    expense.amount = parsed;
  }

  if (description !== undefined) expense.description = description;
  if (date !== undefined) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return throwError(next, "Date không hợp lệ.", 400);
    expense.date = d;
  }

  await expense.save();

  sendSuccess("Cập nhật chi tiêu thành công", res, { expense });
});

// Delete expense
const deleteExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return throwError(next, "id không hợp lệ.", 400);

  const expense = await Expense.findById(id);
  if (!expense) return throwError(next, "Không tìm thấy khoản chi.", 404);

  // ownership check
  if (expense.user_id.toString() !== req.user._id.toString()) {
    return throwError(next, "Không có quyền xóa khoản chi này.", 403);
  }

  await expense.deleteOne();

  sendSuccess("Xóa chi tiêu thành công", res, { expense: null });
});

module.exports = {
  addExpense,
  getExpensesByUser,
  getExpensesByMonth,
  getExpenseSummary,
  updateExpense,
  deleteExpense,
};
