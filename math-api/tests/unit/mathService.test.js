const mathService = require('../../src/services/mathService');

describe('Math Service', () => {
  describe('add', () => {
    it('should correctly add two numbers', () => {
      expect(mathService.add([5, 3])).toBe(8);
    });

    it('should correctly add multiple numbers', () => {
      expect(mathService.add([1, 2, 3, 4, 5])).toBe(15);
    });

    it('should handle decimal numbers', () => {
      expect(mathService.add([2.5, 3.5])).toBe(6);
    });

    it('should throw an error if less than two numbers are provided', () => {
      expect(() => mathService.add([1])).toThrow();
    });
  });

  describe('subtract', () => {
    it('should correctly subtract two numbers', () => {
      expect(mathService.subtract(10, 4)).toBe(6);
    });

    it('should handle negative results', () => {
      expect(mathService.subtract(5, 8)).toBe(-3);
    });

    it('should handle decimal numbers', () => {
      expect(mathService.subtract(5.5, 2.5)).toBe(3);
    });
  });

  describe('calculateFactorial', () => {
    it('should calculate factorial of 0 as 1', () => {
      expect(mathService.calculateFactorial(0)).toBe(1);
    });

    it('should calculate factorial of 1 as 1', () => {
      expect(mathService.calculateFactorial(1)).toBe(1);
    });

    it('should calculate factorial of 5 as 120', () => {
      expect(mathService.calculateFactorial(5)).toBe(120);
    });

    it('should throw an error for negative numbers', () => {
      expect(() => mathService.calculateFactorial(-1)).toThrow();
    });
  });

  describe('generateFibonacciSequence', () => {
    it('should generate an empty sequence for count 0', () => {
      expect(mathService.generateFibonacciSequence(0)).toEqual([]);
    });

    it('should generate sequence [0] for count 1', () => {
      expect(mathService.generateFibonacciSequence(1)).toEqual([0]);
    });

    it('should generate sequence [0, 1] for count 2', () => {
      expect(mathService.generateFibonacciSequence(2)).toEqual([0, 1]);
    });

    it('should generate correct Fibonacci sequence for count 8', () => {
      expect(mathService.generateFibonacciSequence(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
    });
  });

  describe('isPrime', () => {
    it('should identify 2 as prime', () => {
      expect(mathService.isPrime(2)).toBe(true);
    });

    it('should identify 4 as not prime', () => {
      expect(mathService.isPrime(4)).toBe(false);
    });

    it('should identify 17 as prime', () => {
      expect(mathService.isPrime(17)).toBe(true);
    });

    it('should identify 1 as not prime', () => {
      expect(mathService.isPrime(1)).toBe(false);
    });
  });

  describe('generatePrimeNumbers', () => {
    it('should generate first 5 prime numbers correctly', () => {
      expect(mathService.generatePrimeNumbers(5)).toEqual([2, 3, 5, 7, 11]);
    });

    it('should generate first 10 prime numbers correctly', () => {
      expect(mathService.generatePrimeNumbers(10)).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
    });
  });
});