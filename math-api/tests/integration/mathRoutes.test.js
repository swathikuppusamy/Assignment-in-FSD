const request = require('supertest');
const app = require('../../src/app');
const prisma = require('../../src/models');

// Mock the database to avoid persisting test data
jest.mock('../../src/models', () => {
  const mockPrisma = {
    calculation: {
      create: jest.fn().mockImplementation((data) => Promise.resolve({ id: 1, ...data.data })),
      findMany: jest.fn().mockResolvedValue([
        {
          id: 1,
          operation: 'addition',
          input: '[5,3]',
          result: '8',
          createdAt: new Date()
        }
      ]),
      findUnique: jest.fn().mockImplementation((data) => {
        if (data.where.id === 1) {
          return Promise.resolve({
            id: 1,
            operation: 'addition',
            input: '[5,3]',
            result: '8',
            createdAt: new Date()
          });
        }
        return Promise.resolve(null);
      })
    }
  };
  
  return mockPrisma;
});

describe('Math API Routes', () => {
  afterAll(async () => {
    // Clean up any resources
    jest.restoreAllMocks();
  });

  describe('GET /', () => {
    it('should return welcome message with available endpoints', async () => {
      const res = await request(app).get('/');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('endpoints');
    });
  });

  describe('POST /api/add', () => {
    it('should add numbers and return result', async () => {
      const res = await request(app)
        .post('/api/add')
        .send({ numbers: [5, 3] });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('result', 8);
    });

    it('should return validation error if numbers are not provided', async () => {
      const res = await request(app)
        .post('/api/add')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status', 'error');
    });
  });

  describe('POST /api/subtract', () => {
    it('should subtract numbers and return result', async () => {
      const res = await request(app)
        .post('/api/subtract')
        .send({ minuend: 10, subtrahend: 4 });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('result', 6);
    });

    it('should return validation error if parameters are not provided', async () => {
      const res = await request(app)
        .post('/api/subtract')
        .send({ minuend: 10 });
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status', 'error');
    });
  });

  describe('GET /api/factorial/:number', () => {
    it('should calculate factorial and return result', async () => {
      const res = await request(app).get('/api/factorial/5');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('result', 120);
    });

    it('should return validation error if number is negative', async () => {
      const res = await request(app).get('/api/factorial/-1');
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status', 'error');
    });
  });

  describe('GET /api/fibonacci/:count', () => {
    it('should generate Fibonacci sequence and return result', async () => {
      const res = await request(app).get('/api/fibonacci/5');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('sequence');
      expect(res.body.sequence).toEqual([0, 1, 1, 2, 3]);
    });

    it('should return validation error if count is not valid', async () => {
      const res = await request(app).get('/api/fibonacci/0');
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status', 'error');
    });
  });

  describe('GET /api/prime/:count', () => {
    it('should generate prime numbers and return result', async () => {
      const res = await request(app).get('/api/prime/5');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('primes');
      expect(res.body.primes).toEqual([2, 3, 5, 7, 11]);
    });

    it('should return validation error if count is not valid', async () => {
      const res = await request(app).get('/api/prime/0');
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status', 'error');
    });
  });

  describe('GET /api/history', () => {
    it('should return calculation history', async () => {
      const res = await request(app).get('/api/history');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('calculations');
      expect(Array.isArray(res.body.calculations)).toBe(true);
    });
  });

  describe('GET /api/history/:id', () => {
    it('should return a specific calculation by ID', async () => {
      const res = await request(app).get('/api/history/1');
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id', 1);
    });

    it('should return 404 if calculation is not found', async () => {
      const res = await request(app).get('/api/history/999');
      
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status', 'error');
    });
  });
});