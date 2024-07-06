require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Authentication
const checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || apiKey != process.env.API_KEY) {
    return res.status(401).json("Forbidden");
  }

  next();
};

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(checkApiKey);

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    dbName: "PayTok",
  })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
const usersRouter = require("./routes/api/UserRoutes");
const transactionsRouter = require("./routes/api/TransactionRoutes");

app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
