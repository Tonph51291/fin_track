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
  const user = await User.findOne({ email });
  if (!user) return throwError(next, "Email hoặc mật khẩu không đúng", 401);
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
const getUserInfo = asyncHandler(async (req, res, next) => {
  // Lấy userId từ token (đã được gắn vào req.user trong middleware protect)
  const userId = req.user.id;

  // Truy vấn DB
  const user = await User.findById(userId).select("-password"); // loại bỏ password

  if (!user) return throwError(next, "Không tìm thấy người dùng", 404);

  // Trả về thông tin user
  sendSuccess("Lấy thông tin người dùng thành công", res, { user }, 200);
});
const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id; // lấy từ token
  const { name, email, password } = req.body;

  // Tìm user hiện tại
  const user = await User.findById(userId);
  if (!user) return throwError(next, "Không tìm thấy người dùng", 404);

  // Cập nhật các trường (nếu có truyền)
  if (name) user.name = name;
  if (email) user.email = email;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  // Lưu lại vào DB
  const updatedUser = await user.save();

  // Trả về thông tin mới (ẩn password)
  sendSuccess(
    "Cập nhật thông tin người dùng thành công",
    res,
    {
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    },
    200
  );
});

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
