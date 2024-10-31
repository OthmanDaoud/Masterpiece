require("dotenv").config();
const express = require("express");
const connectDB = require("./config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const feedBackRoutes = require("./routes/feedBackRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminUserRoutes = require("./routes/adminUserRoutes");
const errorHandler = require("./middleware/errorHandler");
const adminProductRoutes = require("./routes/adminProductRoutes");
const adminOrdersRoutes = require("./routes/adminOrdersRoutes");
const adminFeedbacksRoutes = require("./routes/adminFeedbackRoutes");

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Routes

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/feedback", feedBackRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin", adminProductRoutes);
app.use("/api/admin/orders", adminOrdersRoutes);
app.use("/api/admin/reviews", adminFeedbacksRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
