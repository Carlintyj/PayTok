const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const uri = "mongodb+srv://admin1:lYTwDHfVH9jLMC86@paytok.0rjgylm.mongodb.net/?retryWrites=true&w=majority&appName=PayTok";
mongoose.connect(uri, {
  dbName: "PayTok"
})
.then(() => console.log("Connected to MongoDB successfully!"))
.catch((error) => console.error("MongoDB connection error:", error));

// Routes
const agentsRouter = require('./routes/api/agents');
const usersRouter = require('./routes/api/users');
const transactionsRouter = require('./routes/api/transactions');

app.use('/api/agents', agentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/transactions', transactionsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});