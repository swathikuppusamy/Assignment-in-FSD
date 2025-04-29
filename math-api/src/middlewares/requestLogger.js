const morgan = require('morgan');

// Custom token for request body logging
morgan.token('request-body', (req) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    return JSON.stringify(req.body);
  }
  return '';
});

// Format: method url status response-time ms - request-body
const logFormat = ':method :url :status :response-time ms - :request-body';

module.exports = morgan(logFormat);