Math API - Node.js Backend
A Node.js application that provides RESTful APIs for various mathematical operations, with data persistence using Prisma ORM and SQLite.

📑 Table of Contents
Features

Design Patterns

Project Structure

API Endpoints

Setup Instructions

Database

Testing

Error Handling

Design Decisions

✅ Features
RESTful API for mathematical operations

Five mathematical endpoints:

Addition

Subtraction

Factorial calculation

Fibonacci sequence generation

Prime number generation

Data persistence using Prisma ORM and SQLite

Request logging with middleware

Detailed error handling

Input validation with express-validator

Comprehensive testing (unit + integration)

Clean architecture using Repository Pattern

🧱 Design Patterns
This application uses several design patterns:

Repository Pattern – Abstracts the data layer and provides methods to access data.

Service Pattern – Contains business logic in service classes.

MVC Pattern – Models (Prisma schema), Controllers, and JSON-based Views.

Middleware Pattern – Express middleware for request logging and error handling.

Strategy Pattern – Applied within the math service to handle different mathematical operations.

Why Repository Pattern?
✅ Separation of concerns

✅ Improved testability

✅ Flexibility to change databases

✅ Centralized data access logic

📁 Project Structure
pgsql
Copy
Edit
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
📡 API Endpoints
➕ Addition
URL: /api/add

Method: POST

Body:

json
Copy
Edit
{ "numbers": [5, 3, 2] }
Response:

json
Copy
Edit
{ "operation": "addition", "numbers": [5, 3, 2], "result": 10 }
➖ Subtraction
URL: /api/subtract

Method: POST

Body:

json
Copy
Edit
{ "minuend": 10, "subtrahend": 4 }
Response:

json
Copy
Edit
{ "operation": "subtraction", "minuend": 10, "subtrahend": 4, "result": 6 }
❗ Factorial
URL: /api/factorial/:number

Method: GET

Example: /api/factorial/5

Response:

json
Copy
Edit
{ "operation": "factorial", "number": 5, "result": 120 }
🔁 Fibonacci Sequence
URL: /api/fibonacci/:count

Method: GET

Example: /api/fibonacci/8

Response:

json
Copy
Edit
{ "operation": "fibonacci", "count": 8, "sequence": [0, 1, 1, 2, 3, 5, 8, 13] }
🔢 Prime Numbers
URL: /api/prime/:count

Method: GET

Example: /api/prime/5

Response:

json
Copy
Edit
{ "operation": "prime_numbers", "count": 5, "primes": [2, 3, 5, 7, 11] }
📜 Calculation History
URL: /api/history

Method: GET

Response:

json
Copy
Edit
{ "count": 2, "calculations": [...] }
🔍 Get Calculation by ID
URL: /api/history/:id

Method: GET

Example: /api/history/1

Response:

json
Copy
Edit
{
  "id": 1,
  "operation": "addition",
  "input": "[5, 3]",
  "result": "8",
  "createdAt": "2025-04-29T12:00:00.000Z"
}
⚙️ Setup Instructions
Prerequisites
Node.js (v14+)

npm or yarn

Installation
bash
Copy
Edit
# Clone the repository
git clone <repository-url>
cd math-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Initialize Prisma and SQLite DB
npx prisma generate
npx prisma migrate dev --name init

# Start the server
npm run dev   # Development mode
# or
npm start     # Production mode
The server will start on http://localhost:3000 or the port defined in .env.

🗄️ Database
This app uses SQLite as the database and Prisma ORM for schema and migrations.

Schema: Calculation table
id – Primary Key (Auto-increment)

operation – Type of operation

input – JSON string of inputs

result – Result as string

createdAt – Timestamp

Useful Prisma Commands
bash
Copy
Edit
npx prisma generate             # Generate client
npx prisma migrate dev --name init  # Create migration
npx prisma studio               # GUI for DB access
🧪 Testing
Supports both unit tests and integration tests.

Run Tests
bash
Copy
Edit
# All tests
npm test

# With coverage
npm test -- --coverage
Test Structure
Unit tests for mathService

Integration tests for route-level validation

🧯 Error Handling
Centralized and consistent:

Input validation errors return detailed messages

Prisma/database errors are converted to readable responses

Unexpected errors include stack traces in logs, clean message for client

🧠 Design Decisions
Why SQLite?
Lightweight and easy for local development

For production, consider PostgreSQL or MySQL

Why Prisma?
Type-safe and easy to use

Built-in migration and schema tools

Better DX with autocompletion and CLI tools

📌 API Structure
GET – Used for retrieval (factorial, fibonacci, primes, history)

POST – Used for creation (addition, subtraction)

✅ Validation
Used express-validator to ensure:

Correct input types (e.g., numbers)

Required fields are present

Limits (e.g., factorial size) are enforced to prevent overflow
