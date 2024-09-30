const express = require("express");
const connectDB = require("./config");
// const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.json());
// app.use(express.static("../frontend"));

// Routes
// app.use("/api/users", userRoutes);

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
