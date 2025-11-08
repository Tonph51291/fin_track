const Category = require("../models/category.model");
const mongoose = require("mongoose");
const { asyncHandler } = require("../middlewares/asyncHandler");
const { sendSuccess, throwError } = require("../utils/response.helper");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Default categories to create for a new user (can be extended)
const DEFAULT_CATEGORIES = [
  { name: "Food", type: "expense" },
  { name: "Transportation", type: "expense" },
  { name: "Bills", type: "expense" },
  { name: "Shopping", type: "expense" },
  { name: "Salary", type: "income" },
  { name: "Bonus", type: "income" },
];

// Add new category
const addCategory = asyncHandler(async (req, res, next) => {
  const userId = req.user && req.user._id;
  const { name, type } = req.body;

  if (!userId || !name || !type) {
    return throwError(next, "Vui lòng cung cấp name và type.", 400);
  }

  if (!isValidObjectId(userId))
    return throwError(next, "userId không hợp lệ.", 400);

  const t = type.toLowerCase();
  if (t !== "income" && t !== "expense")
    return throwError(next, "type phải là 'income' hoặc 'expense'.", 400);

  // prevent duplicate name for same user and type
  const exists = await Category.findOne({
    user_id: userId,
    name: name.trim(),
    type: t,
  });
  if (exists) return throwError(next, "Danh mục đã tồn tại.", 400);

  const category = await Category.create({
    user_id: userId,
    name: name.trim(),
    type: t,
  });

  sendSuccess("Thêm danh mục thành công", res, { category }, 201);
});
const getCategoriesByUser = asyncHandler(async (req, res, next) => {
  const userId = req.user && req.user._id;
  if (!isValidObjectId(userId))
    return throwError(next, "userId không hợp lệ.", 400);

  let categories = await Category.find({ user_id: userId }).sort({
    type: 1,
    name: 1,
  });

  if (!categories || categories.length === 0) {
    // create defaults
    const toCreate = DEFAULT_CATEGORIES.map((c) => ({ ...c, user_id: userId }));
    categories = await Category.insertMany(toCreate);
  }

  sendSuccess("Lấy danh sách danh mục thành công", res, { categories });
});

// Update category
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, type } = req.body;

  if (!isValidObjectId(id)) return throwError(next, "id không hợp lệ.", 400);

  const category = await Category.findById(id);
  if (!category) return throwError(next, "Không tìm thấy danh mục.", 404);

  // ownership check
  if (category.user_id.toString() !== req.user._id.toString()) {
    return throwError(next, "Không có quyền cập nhật danh mục này.", 403);
  }

  if (name !== undefined) category.name = name.trim();
  if (type !== undefined) {
    const t = type.toLowerCase();
    if (t !== "income" && t !== "expense")
      return throwError(next, "type phải là 'income' hoặc 'expense'.", 400);
    category.type = t;
  }

  await category.save();

  sendSuccess("Cập nhật danh mục thành công", res, { category });
});

// Delete category
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return throwError(next, "id không hợp lệ.", 400);

  const category = await Category.findById(id);
  if (!category) return throwError(next, "Không tìm thấy danh mục.", 404);
  // ownership check
  if (category.user_id.toString() !== req.user._id.toString()) {
    return throwError(next, "Không có quyền xóa danh mục này.", 403);
  }

  await category.deleteOne();

  sendSuccess("Xóa danh mục thành công", res, { category: null });
});

module.exports = {
  addCategory,
  getCategoriesByUser,
  updateCategory,
  deleteCategory,
};
