# 🥋 WebDojo

![WebDojo Cover](.github/cover.png)

<div align="center">

[![Cypress](https://img.shields.io/badge/Cypress-14.3-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**A comprehensive Cypress testing training platform for the Ninja do Cypress course**

[Course Website](https://ninjadocypress.com.br) • [Report Bug](https://github.com/rafaeltmanso/webdojo/issues) • [Request Feature](https://github.com/rafaeltmanso/webdojo/issues)

</div>

---

## 📖 About The Project

**WebDojo** is a full-stack testing training application from the **Ninja do Cypress** course by **Fernando Papito**. This repository contains my complete implementation of the course exercises, demonstrating practical test automation skills through comprehensive Cypress testing coverage.

The project comprises a dual-workspace architecture:
- **Frontend Application** - Static web application with various testing scenarios
- **REST API Backend** - Express-based API with PostgreSQL database for API testing practice

> **Note:** The application structure was provided by the course; all test implementations, custom commands, and automation strategies were developed by me as part of the learning process.

### 🎯 Key Features

- **User Management** - Complete CRUD operations for user registration and management
- **Form Interactions** - Complex form scenarios including consultancy requests, file uploads, and dynamic fields
- **JavaScript Alerts** - Alert, confirm, and prompt dialog handling
- **iFrame Interactions** - Video player controls within iframes
- **Drag & Drop** - Kanban board with drag-and-drop functionality
- **Mouseover Events** - Hover interactions and tooltips
- **API Integration** - ZIP code lookup with external API integration
- **GitHub Profile Management** - Dynamic table operations
- **Authentication** - Login system with token-based authentication

---

## 🏗️ Architecture

```
webdojo/
├── api/                    # Express REST API
│   ├── index.js           # API endpoints (User CRUD)
│   ├── prismaClient.js    # Prisma ORM client
│   ├── cypress/           # API test suite
│   │   ├── e2e/          # API tests (GET, POST, PUT, DELETE)
│   │   ├── fixtures/      # Test data (heroes.js)
│   │   └── support/       # Custom commands & database utilities
│   └── prisma/
│       └── schema.prisma  # Database schema
│
├── web/                   # Frontend Application
│   ├── dist/             # Static site files
│   └── cypress/          # E2E test suite
│       ├── e2e/          # UI test specs
│       ├── fixtures/      # Test data (JSON, PDFs)
│       └── support/
│           ├── commands.js      # Custom Cypress commands
│           ├── utils.js         # Helper functions
│           └── actions/         # Page-specific action modules
│
└── docker-compose.yaml    # Infrastructure (PostgreSQL + PgAdmin)
```

---

## 🛠️ Tech Stack

### Backend
- **Express 5.1** - Web framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL 13** - Relational database
- **Node.js 22+** - Runtime environment

### Frontend
- **Serve** - Static file server
- **HTML/CSS/JavaScript** - Core web technologies

### Testing
- **Cypress 14.3** - E2E testing framework
- **cypress-plugin-api** - API testing plugin
- **cypress-real-events** - Real browser event simulation
- **@faker-js/faker** - Test data generation

### DevOps
- **Docker & Docker Compose** - Containerization
- **PgAdmin** - Database management interface
- **Bruno** - API client for manual testing
- **Nodemon** - Development server auto-reload

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 22+ ([Download](https://nodejs.org/))
- **Docker & Docker Compose** ([Download](https://www.docker.com/))
- **Git** ([Download](https://git-scm.com/))
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rafaeltmanso/webdojo.git
   cd webdojo
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```
   
   This will start:
   - PostgreSQL on `localhost:5432`
   - PgAdmin on `http://localhost:15432`

3. **Setup the API**
   ```bash
   cd api
   npm install
   
   # Run Prisma migrations
   npx prisma migrate dev
   
   # Start the API server
   npm run dev
   ```
   API will be available at `http://localhost:3333`

4. **Setup the Web Application**
   ```bash
   cd web
   npm install
   
   # Start the web server
   npm run dev
   ```
   Web app will be available at `http://localhost:3000`

### Database Credentials

- **PostgreSQL**
  - Host: `localhost:5432`
  - Database: `UserDB`
  - User: `dba`
  - Password: `dba`

- **PgAdmin**
  - URL: `http://localhost:15432`
  - Email: `dba@pgadmin.com`
  - Password: `dba`

---

## 🧪 Running Tests

### API Tests

Navigate to the `api/` directory:

```bash
# Run all API tests (headless)
npx cypress run

# Open Cypress Test Runner
npx cypress open
```

**Test Coverage:**
- `post.cy.js` - POST `/api/users/register` (User creation with validation)
- `get.cy.js` - GET `/api/users` and GET `/api/users/:id` (List and retrieve users)
- `put.cy.js` - PUT `/api/users/:id` (Update user)
- `delete.cy.js` - DELETE `/api/users/:id` (Delete user)

### Web E2E Tests

Navigate to the `web/` directory:

```bash
# Run all tests (Desktop viewport: 1920x1080)
npm run test

# Open Cypress Test Runner
npm run test:ui

# Run specific test (Desktop)
npm run test:login

# Run specific test (Mobile viewport: 414x896)
npm run test:login:mobile
```

**Test Suites:**
- `login.cy.js` - Authentication flows
- `signup.cy.js` - User registration
- `consultancy.cy.js` - Complex form interactions
- `alerts.cy.js` - JavaScript dialog handling
- `github.cy.js` - Table CRUD operations
- `kanban.cy.js` - Drag-and-drop functionality
- `iframe.cy.js` - iFrame interactions
- `hover.cy.js` - Mouseover events
- `links.cy.js` - External link validation
- `cep.cy.js` - API integration testing with ViaCEP API mocking
- `expert.cy.js` - Advanced Cypress techniques
- `studio.cy.js` - Cypress Studio examples

### CI/CD Integration

This project is integrated with **Cypress Cloud** and **GitHub Actions** for automated testing:

```bash
# Tests automatically run on push/PR via GitHub Actions
# Results are uploaded to Cypress Cloud dashboard
```

**Features:**
- Automated test execution on every push and pull request
- Test recordings and video replays in Cypress Cloud
- Performance analytics and flaky test detection
- Team collaboration with shared test results
- Historical test run data and trends

---

## � API Documentation

### Endpoints

#### Create User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

**Response:** `201 Created`
```json
{
  "message": "User registered successfully!",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### List Users
```http
GET /api/users
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
]
```

#### Get User
```http
GET /api/users/:id
```

#### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.new@example.com",
  "password": "newpass123"
}
```

**Response:** `204 No Content`

#### Delete User
```http
DELETE /api/users/:id
```

**Response:** `204 No Content`

### Error Responses

- `400 Bad Request` - Missing required fields
- `404 Not Found` - User not found
- `409 Conflict` - Email already registered
- `500 Internal Server Error` - Server error

---

## 🎓 Custom Cypress Commands

### Web Commands

```javascript
cy.start()                           // Navigate to baseUrl
cy.goToSignup()                      // Navigate to signup page
cy.submitLoginform(email, password)  // Fill and submit login form
cy.goTo(buttonName, pageTitle)       // Navigate via button and verify page
cy.login(ui = false)                 // Login (token injection or UI)
```

### API Commands

```javascript
cy.postUser(user)           // POST /api/users/register
cy.getUsers()               // GET /api/users
cy.getUser(userId)          // GET /api/users/:id
cy.putUser(userId, data)    // PUT /api/users/:id
cy.deleteUser(userId)       // DELETE /api/users/:id
```

### Action Commands

```javascript
cy.fillConsultancyForm(form)    // Fill complex consultancy form
cy.submitConsultancyForm()      // Submit consultancy form
cy.validateConsultancyModal()   // Verify success modal
```

---

## 🧩 Testing Patterns

### API Mocking with cy.intercept()
```javascript
// Mock external API responses for reliable, fast tests
cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`, {
  statusCode: 200,
  body: {
    cep: address.cep,
    logradouro: address.street,
    bairro: address.neighborhood,
    localidade: address.city,
    uf: address.state
  }
}).as('getCep')

cy.get('#cep').type(address.cep)
cy.contains('button', 'Buscar').click()
cy.wait('@getCep')  // Wait for intercepted request
```

### Database Cleanup Pattern
```javascript
beforeEach(() => {
  cy.task('deleteUser', user.email)  // Clean database
  cy.postUser(user)                  // Create fresh test data
})
```

### Token Injection Authentication
```javascript
cy.login()  // Fast authentication via localStorage token
```

### UI Login
```javascript
cy.login(true)  // Test login flow through UI
```

### Mass Data Generation
```javascript
import { faker } from '@faker-js/faker'
import _ from 'lodash'

_.times(10, () => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'pwd123'
  }
  cy.postUser(user)
})
```

---

## 🤝 Contributing

This is a personal learning project completed as part of the **Ninja do Cypress** course. While it's not open for external contributions, feel free to fork it for your own learning purposes if you're also a course student.

---

## 📄 License

This project is part of the **Ninja do Cypress** course curriculum. Please respect the course materials and instructor's intellectual property.

---

## �‍🏫 Course Information

**Ninja do Cypress Course**  
Instructor: Fernando Papito

🔗 [ninjadocypress.com.br](https://ninjadocypress.com.br)

---

## 👨‍💻 About This Implementation

This project was developed as part of the **Ninja do Cypress** course by **Fernando Papito**. While the application structure and exercises were provided by the course, **all test implementations, automation strategies, and custom commands were created by me** as practical learning exercises.

### What I Built

- ✅ Complete API test suite covering all CRUD operations
- ✅ Comprehensive E2E test coverage for all web features
- ✅ Custom Cypress commands for authentication and navigation
- ✅ Database integration patterns using Cypress tasks
- ✅ Advanced testing techniques (drag-and-drop, iframes, alerts)
- ✅ Token-based authentication strategies
- ✅ Mass data generation and cleanup utilities
- ✅ Mobile and desktop viewport testing configurations
- ✅ API mocking with cy.intercept() for external services
- ✅ CI/CD pipeline with GitHub Actions and Cypress Cloud integration

**Course by:** [Fernando Papito](https://ninjadocypress.com.br)  
**Implementation by:** Rafael Manso  
**Completed:** October 2025

---

## 🙏 Acknowledgments

- **Fernando Papito** - Course creator and instructor ([Ninja do Cypress](https://ninjadocypress.com.br))
- **Ninja do Cypress Team** - Course curriculum and application design

---

<div align="center">

**Made with ❤️ and ☕ as part of the Ninja do Cypress course**

⭐ Star this repo if you found it helpful!

</div>
