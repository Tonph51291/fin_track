// src/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const AppError = require("./utils/AppError");
const errorMiddleware = require("./middlewares/error.middleware");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require("./routes/user.routes");
const salaryRoutes = require("./routes/salary.routes");
const expenseRoutes = require("./routes/expense.routes");
const categoryRoutes = require("./routes/category.routes");

app.use("/api/users", userRoutes);
app.use("/api/salaries", salaryRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);

// 404 Not Found
app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
