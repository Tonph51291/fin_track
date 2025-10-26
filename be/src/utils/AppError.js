export default class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // đánh dấu là lỗi dự đoán được (vd: input sai)
    Error.captureStackTrace(this, this.constructor);
  }
}
