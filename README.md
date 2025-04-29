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

