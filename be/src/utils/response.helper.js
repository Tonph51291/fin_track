// src/utils/response.helper.js

const { default: AppError } = require("./AppError");

/**
 * Trả về response thành công
 * @param {Object} res - Express response
 * @param {Object} data - Dữ liệu trả về
 * @param {Number} statusCode - HTTP status code, mặc định 200
 */
const sendSuccess = (status = "success", res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: status,
    ...data, // data có thể là { user: {...} }, { result: [...] }, ...
  });
};

/**
 * Trả về lỗi chuẩn
 * @param {Object} next - middleware next()
 * @param {String} message - thông báo lỗi
 * @param {Number} statusCode - mã lỗi HTTP, mặc định 500
 */
const throwError = (next, message, statusCode = 500) => {
  return next(new AppError(message, statusCode));
};

module.exports = { sendSuccess, throwError };
