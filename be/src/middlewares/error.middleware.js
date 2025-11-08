// src/middlewares/error.middleware.js
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "production") {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message || "Something went wrong!",
    });
  }

  // Khi dev: show chi tiết lỗi
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

module.exports = errorMiddleware;
