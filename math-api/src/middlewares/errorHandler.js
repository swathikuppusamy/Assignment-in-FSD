function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    // Handle Prisma errors
    if (err.name === 'PrismaClientKnownRequestError') {
      return res.status(400).json({
        status: 'error',
        message: 'Database operation failed',
        error: err.message
      });
    }
  
    // Handle validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: err.errors
      });
    }
  
    // Default error
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    return res.status(statusCode).json({
      status: 'error',
      message
    });
  }
  
  module.exports = errorHandler;
  