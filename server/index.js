const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON parsing middleware should come before the routes

// Routes
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));