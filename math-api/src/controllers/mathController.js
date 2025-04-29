const mathService = require('../services/mathService');
const calculationRepository = require('../repositories/calculationRepository');

exports.addition = async (req, res, next) => {
  try {
    const { numbers } = req.body;
    const result = mathService.add(numbers);
    
    // Save calculation to database
    await calculationRepository.saveCalculation({
      operation: 'addition',
      input: JSON.stringify(numbers),
      result: result.toString()
    });
    
    res.json({
      operation: 'addition',
      numbers,
      result
    });
  } catch (error) {
    next(error);
  }
};

exports.subtraction = async (req, res, next) => {
  try {
    const { minuend, subtrahend } = req.body;
    const result = mathService.subtract(minuend, subtrahend);
    
    // Save calculation to database
    await calculationRepository.saveCalculation({
      operation: 'subtraction',
      input: JSON.stringify({ minuend, subtrahend }),
      result: result.toString()
    });
    
    res.json({
      operation: 'subtraction',
      minuend,
      subtrahend,
      result
    });
  } catch (error) {
    next(error);
  }
};

exports.factorial = async (req, res, next) => {
  try {
    const number = parseInt(req.params.number);
    const result = mathService.calculateFactorial(number);
    
    // Save calculation to database
    await calculationRepository.saveCalculation({
      operation: 'factorial',
      input: number.toString(),
      result: result.toString()
    });
    
    res.json({
      operation: 'factorial',
      number,
      result
    });
  } catch (error) {
    next(error);
  }
};

exports.fibonacci = async (req, res, next) => {
  try {
    const count = parseInt(req.params.count);
    const sequence = mathService.generateFibonacciSequence(count);
    
    // Save calculation to database
    await calculationRepository.saveCalculation({
      operation: 'fibonacci',
      input: count.toString(),
      result: JSON.stringify(sequence)
    });
    
    res.json({
      operation: 'fibonacci',
      count,
      sequence
    });
  } catch (error) {
    next(error);
  }
};

exports.primeNumbers = async (req, res, next) => {
  try {
    const count = parseInt(req.params.count);
    const primes = mathService.generatePrimeNumbers(count);
    
    // Save calculation to database
    await calculationRepository.saveCalculation({
      operation: 'prime',
      input: count.toString(),
      result: JSON.stringify(primes)
    });
    
    res.json({
      operation: 'prime_numbers',
      count,
      primes
    });
  } catch (error) {
    next(error);
  }
};

exports.getCalculationHistory = async (req, res, next) => {
  try {
    const history = await calculationRepository.getAllCalculations();
    
    res.json({
      count: history.length,
      calculations: history
    });
  } catch (error) {
    next(error);
  }
};

exports.getCalculationById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const calculation = await calculationRepository.getCalculationById(id);
    
    if (!calculation) {
      return res.status(404).json({
        status: 'error',
        message: `Calculation with ID ${id} not found`
      });
    }
    
    res.json(calculation);
  } catch (error) {
    next(error);
  }
};