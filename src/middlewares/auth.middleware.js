const jwt = require("jsonwebtoken");
const { throwError } = require("../utils/response.helper");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

/**
 * Middleware: verify Bearer token in Authorization header.
 * On success: sets req.user = { id, email } and calls next().
 * On failure: calls next() with AppError via throwError(next, message, 401)
 */
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return throwError(next, "Token not provided or malformed", 401);
  }

  const token = authHeader.split(" ")[1];
  if (!token) return throwError(next, "Token not provided", 401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // attach minimal user info to request
    req.user = { id: decoded.id, email: decoded.email };
    return next();
  } catch (err) {
    return throwError(next, "Invalid or expired token", 401);
  }
};

module.exports = { protect };
