// Utility functions for validation
const isValidNumber = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };
  
  const isPositiveInteger = (value) => {
    const num = parseInt(value);
    return Number.isInteger(num) && num > 0;
  };
  
  const isNonNegativeInteger = (value) => {
    const num = parseInt(value);
    return Number.isInteger(num) && num >= 0;
  };
  
  module.exports = {
    isValidNumber,
    isPositiveInteger,
    isNonNegativeInteger
  };