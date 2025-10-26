const { asyncHandler } = require("../middlewares/asyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { sendSuccess, throwError } = require("../utils/response.helper");

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const exist = await User.findOne({ email });
  if (exist) return throwError(next, "Email đã tồn tại", 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  // Dùng helper trả về chuẩn
  sendSuccess(
    "Đăng ký thành công",
    res,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
    201
  );
});
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Kiểm tra email tồn tại
  const user = await User.findOne({ email });
  if (!user) return throwError(next, "Email hoặc mật khẩu không đúng", 401);

  // 2. So sánh password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return throwError(next, "Email hoặc mật khẩu không đúng", 401);

  // 3. Tạo token JWT
  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // 4. Trả về token + info user (dùng sendSuccess helper)
  sendSuccess(
    "Đăng nhập thành công",
    res,
    {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    },
    200
  );
});
const getUserInfo = (req, res) => {
  res.json({ message: "Get user info", userId: req.params.id });
};

const updateUser = (req, res) => {
  res.json({ message: "Update user successfully", userId: req.params.id });
};

const deleteUser = (req, res) => {
  res.json({ message: "Delete user successfully", userId: req.params.id });
};

module.exports = {
  register,
  login,
  getUserInfo,
  updateUser,
  deleteUser,
};
