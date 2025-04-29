const express = require('express');
const cors = require('cors');
const mathRoutes = require('./routes/mathRoutes');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api', mathRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Math API',
    endpoints: [
      { method: 'POST', path: '/api/add', description: 'Add two numbers' },
      { method: 'POST', path: '/api/subtract', description: 'Subtract two numbers' },
      { method: 'GET', path: '/api/factorial/:number', description: 'Calculate factorial of a number' },
      { method: 'GET', path: '/api/fibonacci/:count', description: 'Generate Fibonacci sequence' },
      { method: 'GET', path: '/api/prime/:count', description: 'Generate prime numbers' }
    ]
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;