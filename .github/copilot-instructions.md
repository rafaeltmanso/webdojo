# WebDojo - Copilot Instructions

## Project Overview
**WebDojo** is a dual-workspace Cypress testing training project for the "Ninja do Cypress" course. It consists of:
- **`web/`** - Frontend application (served via `serve`) for E2E UI testing
- **`api/`** - Express REST API with Prisma ORM for API testing
- **Shared infrastructure** - PostgreSQL database via Docker Compose

## Architecture & Key Components

### Project Structure
```
webdojo/
├── api/           # Express API + API tests
│   ├── index.js           # REST endpoints for User CRUD
│   ├── prismaClient.js    # Prisma DB client
│   ├── cypress/           # API tests (cy.api plugin)
│   └── prisma/schema.prisma
└── web/           # Frontend + UI tests
    ├── dist/              # Static site (served by npm run dev)
    └── cypress/           # UI E2E tests
        ├── e2e/
        ├── fixtures/      # Test data (JSON, PDFs)
        └── support/
            ├── commands.js       # Custom Cypress commands
            ├── utils.js          # Helper functions
            └── actions/          # Page-specific action modules
```

### Database Architecture
- **PostgreSQL** runs in Docker (`docker-compose.yaml`)
- **Prisma ORM** manages schema and migrations (`api/prisma/`)
- Database credentials: `dba/dba` @ `localhost:5432/UserDB`
- PgAdmin available at `http://localhost:15432` (dba@pgadmin.com/dba)

### API Endpoints (Port 3333)
```javascript
POST   /api/users/register  // Create user (409 if email exists)
GET    /api/users           // List all users (no passwords)
GET    /api/users/:id       // Get single user
PUT    /api/users/:id       // Update user (204 on success)
DELETE /api/users/:id       // Delete user (404 if not found)
```

## Development Workflows

### Starting Services
```bash
# Terminal 1 - Start database
docker-compose up

# Terminal 2 - Start API (from api/)
cd api && npm run dev  # Runs on http://localhost:3333

# Terminal 3 - Start web (from web/)
cd web && npm run dev  # Serves dist/ on http://localhost:3000
```

### Running Tests
**API Tests** (from `api/`):
```bash
npx cypress run              # Headless all tests
npx cypress open             # Interactive mode
```

**Web Tests** (from `web/`):
```bash
npm run test                 # All tests (1920x1080)
npm run test:ui              # Interactive mode
npm run test:login           # Single spec (desktop)
npm run test:login:mobile    # Single spec (414x896)
```

## Project-Specific Conventions

### Custom Cypress Commands

**Web Commands** (`web/cypress/support/commands.js`):
```javascript
cy.start()                           // Visit baseUrl
cy.goToSignup()                      // Navigate to signup page
cy.submitLoginform(email, password)  // Fill and submit login
cy.goTo(buttonName, pageTitle)       // Navigate and verify page
cy.login(ui = false)                 // Login via token injection (default) or UI
```

**API Commands** (`api/cypress/support/commands.js`):
```javascript
cy.postUser(user)           // POST user to API
cy.getUsers()               // GET all users
cy.getUser(userId)          // GET single user
cy.putUser(userId, data)    // PUT user update
cy.deleteUser(userId)       // DELETE user
```

**Action Commands** (`web/cypress/support/actions/consultancy.actions.js`):
```javascript
cy.fillConsultancyForm(form)    // Fill complex consultancy form
cy.submitConsultancyForm()      // Submit form
cy.validateConsultancyModal()   // Verify success modal
```

### Test Data Patterns

**Fixtures for mass operations** (`api/cypress/fixtures/heroes.js`):
```javascript
const heroes = [{name: 'Superman', email: 'clark.kent@...', password: 'pwd123'}, ...]
// Used in before() hooks to seed test data
```

**JSON fixtures** (`web/cypress/fixtures/consultancy.json`):
```javascript
import { personal, company } from '../fixtures/consultancy.json'
// Contains pre-configured form data objects
```

### Database Task Pattern
**Setup** (`api/cypress.config.js`):
```javascript
setupNodeEvents(on, config) {
  on('task', {
    deleteUser(email) {
      return deleteUserByEmail(email) // Direct SQL via pg-promise
    }
  })
}
```

**Usage** (in tests):
```javascript
cy.task('deleteUser', user.email)  // Clean DB before test
cy.postUser(user)                  // Then create fresh user
```

### Authentication Strategy
**Token injection** (default, faster):
```javascript
cy.login()  // Injects hardcoded token + date cookie, visits /dashboard
```

**UI login** (when testing login flow):
```javascript
cy.login(true)  // Uses submitLoginForm with papito@webdojo.com/katana123
```

### Viewport Configurations
- **Desktop**: 1920x1080 (default via package.json scripts)
- **Mobile**: 414x896 (specific test:login:mobile script)
- Set via `--config viewportWidth=X,viewportHeight=Y`

### Plugins Used
- **`cypress-plugin-api`** - Adds `cy.api()` for API testing (`api/` workspace)
- **`cypress-real-events`** - Enables real browser events (`web/` workspace)
- **`@faker-js/faker`** - Generate test data (available in `api/` devDeps)
- **`experimentalStudio: true`** - Enabled in web config for test recording

## Critical Patterns

### API Error Handling
All API endpoints return consistent error structures:
```javascript
{ error: 'Name is required!' }         // 400 validation
{ error: 'Email already registered!' } // 409 conflict
{ error: 'User not found!' }           // 404 not found
```

### Test Organization
- **E2E tests**: Named by feature (`signup.cy.js`, `consultancy.cy.js`)
- **API tests**: Named by HTTP method (`post.cy.js`, `get.cy.js`, `put.cy.js`, `delete.cy.js`)
- Use `beforeEach()` for navigation/setup, `before()` for data seeding

### Assertion Patterns
```javascript
// Status + message + data structure
expect(response.status).to.eql(201)
expect(response.body.message).to.eql('User registered successfully!')
expect(response.body.user.id).to.match(/^-?\d+$/)

// No password in responses
expect(found).to.not.have.property('password')

// CSS validation
.should('have.class', 'text-red-400')
.and('have.css', 'color', 'rgb(248, 113, 113)')
```

### Request Interception
```javascript
cy.intercept('POST', 'http://localhost:3333/api/users/register', {
  statusCode: 201,
  body: { message: 'Usuário cadastrado com sucesso' }
}).as('postSignup')
```

## Key Files Reference
- **`api/index.js`** - All REST endpoints and validation logic
- **`api/prisma/schema.prisma`** - Database schema (User model)
- **`api/cypress/support/database.js`** - Direct SQL operations
- **`web/cypress/support/commands.js`** - Navigation & authentication helpers
- **`web/cypress/support/actions/`** - Complex form interaction modules
- **`docker-compose.yaml`** - Infrastructure setup (db + pgadmin)
