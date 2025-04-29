Math API - Node.js Backend
A Node.js application that provides RESTful APIs for various mathematical operations, with data persistence using Prisma ORM and SQLite.
Table of Contents

Features
Design Patterns
Project Structure
API Endpoints
Setup Instructions
Database
Testing
Error Handling
Design Decisions

Features

RESTful API for mathematical operations
Five mathematical endpoints:

Addition
Subtraction
Factorial calculation
Fibonacci sequence generation
Prime number generation


Data persistence with Prisma ORM and SQLite
Request logging
Detailed error handling
Input validation
Comprehensive testing
Clean architecture using Repository pattern

Design Patterns
This application uses several design patterns:

Repository Pattern - Abstracts the data layer and provides methods to access data.
Service Pattern - Contains business logic in service classes.
MVC (Model-View-Controller) - Separates concerns with models (Prisma schema), controllers, and JSON responses (view).
Middleware Pattern - Uses Express middleware for request processing, logging, and error handling.
Strategy Pattern - Applied within the math service to handle different mathematical operations.

Why Repository Pattern?
The Repository pattern was chosen to decouple the business logic from data access logic. This has several benefits:

Separation of concerns - Business logic doesn't need to know how data is stored
Improved testability - Data access can be easily mocked for unit tests
Flexibility - The database can be changed with minimal impact on the rest of the code
Centralized data access logic - Data access code is not duplicated throughout the application

Project Structure
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
API Endpoints
Addition

URL: /api/add
Method: POST
Body: { "numbers": [5, 3, 2] }
Response: { "operation": "addition", "numbers": [5, 3, 2], "result": 10 }

Subtraction

URL: /api/subtract
Method: POST
Body: { "minuend": 10, "subtrahend": 4 }
Response: { "operation": "subtraction", "minuend": 10, "subtrahend": 4, "result": 6 }

Factorial

URL: /api/factorial/:number
Method: GET
Example: /api/factorial/5
Response: { "operation": "factorial", "number": 5, "result": 120 }

Fibonacci Sequence

URL: /api/fibonacci/:count
Method: GET
Example: /api/fibonacci/8
Response: { "operation": "fibonacci", "count": 8, "sequence": [0, 1, 1, 2, 3, 5, 8, 13] }

Prime Numbers

URL: /api/prime/:count
Method: GET
Example: /api/prime/5
Response: { "operation": "prime_numbers", "count": 5, "primes": [2, 3, 5, 7, 11] }

Calculation History

URL: /api/history
Method: GET
Response: { "count": 2, "calculations": [...] }

Get Calculation by ID

URL: /api/history/:id
Method: GET
Example: /api/history/1
Response: The calculation object with its details

Setup Instructions
Prerequisites

Node.js (>= 14.0.0)
npm or yarn

Installation

Clone the repository:
bashgit clone <repository-url>
cd math-api

Install dependencies:
bashnpm install

Set up environment variables:
bashcp .env.example .env

Initialize Prisma and create the SQLite database:
bashnpx prisma generate
npx prisma migrate dev --name init

Start the application:
bashnpm run dev  # Development mode with hot reload
or
bashnpm start    # Production mode

The server will start on port 3000 (or the port specified in your .env file)

Database
This application uses SQLite as the database, managed through Prisma ORM.
Schema
The database has a Calculation table with the following structure:

id - Auto-incremented primary key
operation - The type of mathematical operation performed
input - The input parameters as a JSON string
result - The result of the operation as a string
createdAt - Timestamp when the calculation was performed

Prisma Commands

Generate Prisma client: npx prisma generate
Create migrations: npx prisma migrate dev --name <migration-name>
View database with Prisma Studio: npx prisma studio

Testing
The application includes both unit tests and integration tests.
Running Tests
bash# Run all tests
npm test

# Run with coverage report
npm test -- --coverage
Test Structure

Unit tests for the service layer (mathService)
Integration tests for the API endpoints

Error Handling
The application uses a centralized error handling mechanism:

Input validation errors are caught and returned with appropriate validation messages
Prisma database errors are caught and transformed into user-friendly error messages
Other runtime errors are captured with stack traces in the logs and simplified error messages for the client

Design Decisions
Why SQLite?
SQLite was chosen for simplicity and ease of setup. For a production application with higher load, you might want to switch to PostgreSQL or MySQL.
Why Prisma?
Prisma provides:

Type-safe database access
Automatic migrations
Simple and consistent API for database operations
Great developer experience with autocompletion

API Structure
The API is designed following RESTful principles, with appropriate HTTP methods for different operations:

GET for retrieving data (factorial, fibonacci, primes)
POST for creating new resources (addition, subtraction)

Validation
Express-validator is used for input validation to ensure that:

Input parameters are of the correct type
Numbers are within reasonable ranges (e.g., factorial is limited to prevent overflow)
Required parameters are present


This Math API demonstrates a well-structured Node.js application with proper separation of concerns, error handling, and testing.