# Math API - Node.js Backend

A Node.js application that provides RESTful APIs for various mathematical operations, with data persistence using Prisma ORM and SQLite.

---

## Table of Contents

- [Features](#features)
- [Design Patterns](#design-patterns)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Database](#database)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [Design Decisions](#design-decisions)

---

## Features

- RESTful API for mathematical operations
- Five mathematical endpoints:
  - Addition
  - Subtraction
  - Factorial calculation
  - Fibonacci sequence generation
  - Prime number generation
- Data persistence with Prisma ORM and SQLite
- Request logging
- Detailed error handling
- Input validation
- Comprehensive testing
- Clean architecture using Repository pattern

---

## Design Patterns

This application uses several design patterns:

- **Repository Pattern** – Abstracts the data layer and provides methods to access data.
- **Service Pattern** – Contains business logic in service classes.
- **MVC (Model-View-Controller)** – Separates concerns with models (Prisma schema), controllers, and JSON responses (view).
- **Middleware Pattern** – Uses Express middleware for request processing, logging, and error handling.
- **Strategy Pattern** – Applied within the math service to handle different mathematical operations.

### Why Repository Pattern?

The Repository pattern was chosen to decouple the business logic from data access logic. Benefits include:

- **Separation of concerns** – Business logic doesn't need to know how data is stored.
- **Improved testability** – Data access can be easily mocked for unit tests.
- **Flexibility** – The database can be changed with minimal impact on the rest of the code.
- **Centralized data access logic** – No duplication of data access code.

---

## Project Structure
math-api/
├── src/
│   ├── controllers/
│   │   └── mathController.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── requestLogger.js
│   ├── models/
│   │   └── index.js
│   ├── repositories/
│   │   └── calculationRepository.js
│   ├── routes/
│   │   └── mathRoutes.js
│   ├── services/
│   │   └── mathService.js
│   ├── utils/
│   │   └── validationUtils.js
│   ├── app.js
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tests/
│   ├── unit/
│   │   └── mathService.test.js
│   └── integration/
│       └── mathRoutes.test.js
├── .env
├── package.json
└── README.md




---

## API Endpoints

### Addition

- **URL:** `/api/add`
- **Method:** `POST`
- **Body:** `{ "numbers": [5, 3, 2] }`
- **Response:** `{ "operation": "addition", "numbers": [5, 3, 2], "result": 10 }`

### Subtraction

- **URL:** `/api/subtract`
- **Method:** `POST`
- **Body:** `{ "minuend": 10, "subtrahend": 4 }`
- **Response:** `{ "operation": "subtraction", "minuend": 10, "subtrahend": 4, "result": 6 }`

### Factorial

- **URL:** `/api/factorial/:number`
- **Method:** `GET`
- **Example:** `/api/factorial/5`
- **Response:** `{ "operation": "factorial", "number": 5, "result": 120 }`

### Fibonacci Sequence

- **URL:** `/api/fibonacci/:count`
- **Method:** `GET`
- **Example:** `/api/fibonacci/8`
- **Response:** `{ "operation": "fibonacci", "count": 8, "sequence": [0, 1, 1, 2, 3, 5, 8, 13] }`

### Prime Numbers

- **URL:** `/api/prime/:count`
- **Method:** `GET`
- **Example:** `/api/prime/5`
- **Response:** `{ "operation": "prime_numbers", "count": 5, "primes": [2, 3, 5, 7, 11] }`

### Calculation History

- **URL:** `/api/history`
- **Method:** `GET`
- **Response:** `{ "count": 2, "calculations": [...] }`

### Get Calculation by ID

- **URL:** `/api/history/:id`
- **Method:** `GET`
- **Example:** `/api/history/1`
- **Response:** The calculation object with its details

---

## Setup Instructions

### Prerequisites

- Node.js (>= 14.0.0)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd math-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize Prisma and create the SQLite database
npx prisma generate
npx prisma migrate dev --name init

# Start the application
npm run dev    # Development mode
# or
npm start      # Production mode
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name <migration-name>

# Open Prisma Studio
npx prisma studio
# Run all tests
npm test

# With coverage report
npm test -- --coverage

