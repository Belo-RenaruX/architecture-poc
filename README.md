# 🏗️ Architecture PoC – Fastify + TypeScript + Clean Architecture

This project is a **Node.js backend proof of concept (PoC)** using **Fastify**, **TypeScript**, **Kysely (MySQL)**, and **Clean Architecture + MVC** principles. It is designed for scalability, testability, and maintainability while remaining lightweight and highly modular.

---

## 📚 Architecture Overview

This project follows a layered Clean Architecture with clear separation of concerns:

### 1. **Routes**

- Declares the HTTP endpoints using Fastify.
- Responsible only for routing requests to the appropriate controller.
- Registers OpenAPI docs via `zod-to-openapi`.

### 2. **Controllers**

- Orchestrate the flow of input → interactor → output.
- Convert validated request input into application logic.
- Return a `ResponseModel` to the client.

### 3. **Interactors (Use Cases)**

- Handle business logic specific to each use case.
- Validate and transform data.
- Always return either:
  - A success model (e.g. DTO or Entity)
  - Or an `ErrorModel`.

### 4. **Models**

- Business-focused entities (e.g. `UserModel`) that encapsulate logic like formatting or computed properties.
- Includes transformation methods (`toDTO()`).

### 5. **Repositories**

- Abstract the persistence layer (e.g., MySQL).
- Implement interfaces that can be swapped for mocking, testing, etc.

### 6. **DTOs / Schemas**

- `zod`-based validation schemas used in:
  - Input parsing
  - Response validation
  - OpenAPI documentation generation
- Ensures end-to-end type safety.

### 7. **Managers / Services**

- Cross-cutting concerns like encryption, JWT, configuration, etc.
- Encapsulates 3rd-party libraries like `jose` or `crypto`.

### 8. **Docs**

- OpenAPI spec generation with `@asteasolutions/zod-to-openapi`.
- Uses a custom `DocsHelper` and registry to generate Swagger UI.

---

## 🚀 How to Run the Project

### 🐳 Docker (Recommended for Development)

Ensure you have **Docker + Docker Compose** installed.

```bash
# Clone the project
git clone https://github.com/Belo-RenaruX/architecture-poc.git
cd architecture-poc

# Start the app and MySQL
docker compose up --build
```
