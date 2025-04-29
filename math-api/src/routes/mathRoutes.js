const express = require('express');
const { body, param, validationResult } = require('express-validator');
const mathController = require('../controllers/mathController');

const router = express.Router();

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array()
    });
  }
  next();
};

// Addition route
router.post(
  '/add',
  [
    body('numbers')
      .isArray()
      .withMessage('Numbers must be an array')
      .custom(numbers => numbers.length >= 2)
      .withMessage('At least two numbers are required'),
    body('numbers.*')
      .isNumeric()
      .withMessage('All values must be numbers')
  ],
  validate,
  mathController.addition
);

// Subtraction route
router.post(
  '/subtract',
  [
    body('minuend')
      .isNumeric()
      .withMessage('Minuend must be a number'),
    body('subtrahend')
      .isNumeric()
      .withMessage('Subtrahend must be a number')
  ],
  validate,
  mathController.subtraction
);

// Factorial route
router.get(
  '/factorial/:number',
  [
    param('number')
      .isInt({ min: 0, max: 170 })
      .withMessage('Number must be a non-negative integer less than 171')
  ],
  validate,
  mathController.factorial
);

// Fibonacci route
router.get(
  '/fibonacci/:count',
  [
    param('count')
      .isInt({ min: 1, max: 100 })
      .withMessage('Count must be between 1 and 100')
  ],
  validate,
  mathController.fibonacci
);

// Prime numbers route
router.get(
  '/prime/:count',
  [
    param('count')
      .isInt({ min: 1, max: 1000 })
      .withMessage('Count must be between 1 and 1000')
  ],
  validate,
  mathController.primeNumbers
);

// Get calculation history
router.get('/history', mathController.getCalculationHistory);

// Get calculation by ID
router.get(
  '/history/:id',
  [
    param('id')
      .isInt({ min: 1 })
      .withMessage('ID must be a positive integer')
  ],
  validate,
  mathController.getCalculationById
);

module.exports = router;