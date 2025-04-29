// Service for mathematical operations using the Strategy pattern
class MathService {
    // Addition operation
    add(numbers) {
      if (!Array.isArray(numbers) || numbers.length < 2) {
        throw new Error('At least two numbers are required for addition');
      }
      
      return numbers.reduce((sum, num) => sum + parseFloat(num), 0);
    }
    
    // Subtraction operation
    subtract(minuend, subtrahend) {
      return parseFloat(minuend) - parseFloat(subtrahend);
    }
    
    // Factorial calculation
    calculateFactorial(number) {
      const n = parseInt(number);
      
      if (n < 0) {
        throw new Error('Factorial is not defined for negative numbers');
      }
      
      if (n > 170) {
        throw new Error('Number too large for factorial calculation');
      }
      
      if (n === 0 || n === 1) {
        return 1;
      }
      
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      
      return result;
    }
    
    // Fibonacci sequence generation
    generateFibonacciSequence(count) {
      const sequence = [];
      
      if (count <= 0) {
        return sequence;
      }
      
      if (count >= 1) {
        sequence.push(0);
      }
      
      if (count >= 2) {
        sequence.push(1);
      }
      
      for (let i = 2; i < count; i++) {
        sequence.push(sequence[i-1] + sequence[i-2]);
      }
      
      return sequence;
    }
    
    // Prime number generation
    generatePrimeNumbers(count) {
      const primes = [];
      let num = 2;
      
      while (primes.length < count) {
        if (this.isPrime(num)) {
          primes.push(num);
        }
        num++;
      }
      
      return primes;
    }
    
    // Helper method to check if a number is prime
    isPrime(n) {
      if (n <= 1) return false;
      if (n <= 3) return true;
      if (n % 2 === 0 || n % 3 === 0) return false;
      
      let i = 5;
      while (i * i <= n) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
        i += 6;
      }
      
      return true;
    }
  }
  
  module.exports = new MathService();