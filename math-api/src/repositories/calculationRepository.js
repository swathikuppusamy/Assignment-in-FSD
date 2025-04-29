const prisma = require('../models');

// Repository pattern for database operations
class CalculationRepository {
  async saveCalculation(calculationData) {
    return prisma.calculation.create({
      data: calculationData
    });
  }

  async getAllCalculations() {
    return prisma.calculation.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getCalculationById(id) {
    return prisma.calculation.findUnique({
      where: { id }
    });
  }

  async getCalculationsByOperation(operation) {
    return prisma.calculation.findMany({
      where: { operation },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
}

module.exports = new CalculationRepository();