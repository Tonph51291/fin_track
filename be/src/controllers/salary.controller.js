const Salary = require("../models/salary.model");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { sendSuccess, throwError } = require("../utils/response.helper");

// Helper: kiểm tra giá trị hợp lệ
const isValidMonth = (month) =>
  Number.isInteger(month) && month >= 1 && month <= 12;
const isValidYear = (year) =>
  Number.isInteger(year) && year >= 1900 && year <= 3000;
const isValidAmount = (amount) => typeof amount === "number" && amount >= 0;

const addSalary = asyncHandler(async (req, res, next) => {
  const { month, year, amount, note } = req.body;

  // === VALIDATE ===
  if (!month || !year || amount === undefined) {
    return throwError(next, "Vui lòng nhập đầy đủ tháng, năm và số tiền.", 400);
  }

  if (!isValidMonth(Number(month))) {
    return throwError(next, "Tháng không hợp lệ (phải từ 1 đến 12).", 400);
  }

  if (!isValidYear(Number(year))) {
    return throwError(next, "Năm không hợp lệ.", 400);
  }

  if (!isValidAmount(Number(amount))) {
    return throwError(next, "Số tiền phải là số dương.", 400);
  }

  if (note && typeof note !== "string") {
    return throwError(next, "Ghi chú phải là chuỗi văn bản.", 400);
  }

  // === CHECK DUPLICATE ===
  const existingSalary = await Salary.findOne({
    user_id: req.user._id,
    month,
    year,
  });

  if (existingSalary) {
    return throwError(next, "Lương cho tháng và năm này đã tồn tại.", 400);
  }

  const salary = await Salary.create({
    user_id: req.user._id,
    month,
    year,
    amount,
    note,
  });

  sendSuccess("Thêm lương thành công", res, { salary }, 201);
});

const getSalariesByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const salaries = await Salary.find({ user_id: userId }).sort({
    year: -1,
    month: -1,
  });

  sendSuccess("Lấy danh sách lương thành công", res, { salaries });
});

const getSalaryByMonth = asyncHandler(async (req, res) => {
  const { month, year } = req.params;
  const userId = req.user._id;

  if (!isValidMonth(Number(month)) || !isValidYear(Number(year))) {
    return throwError(next, "Tháng hoặc năm không hợp lệ.", 400);
  }

  const salary = await Salary.findOne({
    user_id: userId,
    month: Number(month),
    year: Number(year),
  });

  if (!salary) {
    return throwError(next, "Không tìm thấy lương cho tháng và năm này.", 404);
  }

  sendSuccess("Lấy thông tin lương thành công", res, { salary });
});

const updateSalary = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { amount, note } = req.body;

  const salary = await Salary.findById(id);

  if (!salary) {
    return throwError(next, "Không tìm thấy bản ghi lương.", 404);
  }

  // Kiểm tra quyền sở hữu
  if (salary.user_id.toString() !== req.user._id.toString()) {
    return throwError(next, "Không có quyền cập nhật bản ghi này.", 403);
  }

  // === VALIDATE ===
  if (amount !== undefined && !isValidAmount(Number(amount))) {
    return throwError(next, "Số tiền phải là số dương.", 400);
  }

  if (note && typeof note !== "string") {
    return throwError(next, "Ghi chú phải là chuỗi văn bản.", 400);
  }

  salary.amount = amount !== undefined ? amount : salary.amount;
  salary.note = note || salary.note;
  await salary.save();

  sendSuccess("Cập nhật lương thành công", res, { salary });
});

const deleteSalary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const salary = await Salary.findById(id);

  if (!salary) {
    return throwError(next, "Không tìm thấy bản ghi lương.", 404);
  }

  if (salary.user_id.toString() !== req.user._id.toString()) {
    return throwError(next, "Không có quyền xóa bản ghi này.", 403);
  }

  await salary.deleteOne();

  sendSuccess("Xóa lương thành công", res, { salary: null });
});

module.exports = {
  addSalary,
  getSalariesByUser,
  getSalaryByMonth,
  updateSalary,
  deleteSalary,
};
