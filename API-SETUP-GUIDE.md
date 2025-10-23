# Part 2: API Workspace - Cypress Cloud & GitHub Actions

## ✅ What's Been Set Up

### 1. Cypress Configuration
- **File**: `api/cypress.config.js`
- **Action**: Added `projectId` placeholder
- **Next**: Replace `'YOUR_API_PROJECT_ID'` with your actual Cypress Cloud API project ID

### 2. Package Scripts
- **File**: `api/package.json`
- **Added scripts**:
  ```bash
  npm test              # Run all API tests locally
  npm run test:ui       # Open Cypress UI
  npm run test:ci       # Run with Cypress Cloud recording
  npm run test:ci:parallel  # Run with parallelization
  ```

### 3. GitHub Actions Workflow
- **File**: `.github/workflows/cypress-api-tests.yml`
- **Features**:
  - ✅ Auto-runs on push to `main` (when API files change)
  - ✅ Auto-runs on pull requests
  - ✅ Manual trigger with custom options (browser, spec, recording)
  - ✅ PostgreSQL database via GitHub service
  - ✅ Prisma migrations
  - ✅ Cypress Cloud recording
  - ✅ Test artifacts (screenshots/videos on failure)

## 📋 Setup Checklist

### Step 1: Create Cypress Cloud Project for API
1. Go to [Cypress Cloud](https://cloud.cypress.io/)
2. Create a new project named **"WebDojo - API Tests"**
3. Copy the **projectId** from Project Settings
4. Replace `'YOUR_API_PROJECT_ID'` in `api/cypress.config.js` with your actual ID

### Step 2: Get Record Key
1. In your Cypress Cloud API project
2. Go to **Project Settings**
3. Copy the **Record Key**

### Step 3: Add GitHub Secret
1. Go to your GitHub repo: `https://github.com/rafaeltmanso/webdojo/settings/secrets/actions`
2. Click **New repository secret**
3. Name: `CYPRESS_API_RECORD_KEY`
4. Value: [Paste your Record Key]
5. Click **Add secret**

### Step 4: Test Locally (Optional)
```bash
cd api

# Run tests normally
npm test

# Run with Cypress Cloud recording
export CYPRESS_RECORD_KEY=your-record-key-here
npm run test:ci
```

### Step 5: Push and Test
```bash
git add .
git commit -m "Add API Cypress Cloud integration"
git push origin main
```

Watch your workflow run at: `https://github.com/rafaeltmanso/webdojo/actions`

## 🎯 Manual Trigger Options

From GitHub UI (Actions → API Tests → Run workflow):

1. **Browser**: Choose chrome, firefox, or edge
2. **Specific test**: 
   - Leave empty for all tests
   - Or specify: `cypress/e2e/post.cy.js` (or get.cy.js, put.cy.js, delete.cy.js)
3. **Record to Cypress Cloud**: Enable/disable recording

## 📊 What Gets Tested

The API workflow tests all CRUD operations:
- ✅ `POST /api/users/register` - User creation (post.cy.js)
- ✅ `GET /api/users` - List all users (get.cy.js)
- ✅ `GET /api/users/:id` - Get single user (get.cy.js)
- ✅ `PUT /api/users/:id` - Update user (put.cy.js)
- ✅ `DELETE /api/users/:id` - Delete user (delete.cy.js)

## 🔄 Workflow Triggers

### Automatic:
- Push to `main` branch (when `api/**` files change)
- Pull requests to `main` (when `api/**` files change)

### Manual:
- GitHub Actions UI → API Tests → Run workflow
- Customize browser, spec, and recording options

## 🎉 Benefits

- ✅ **Fast Feedback** - Tests run on every push
- ✅ **Cloud Recording** - Video/screenshots in Cypress Cloud
- ✅ **Database Tasks** - `cy.task('deleteUser')` works via `pg-promise`
- ✅ **Multi-Browser** - Test on Chrome, Firefox, Edge
- ✅ **Flexible Runs** - Full suite or individual specs
- ✅ **CI/CD Ready** - Automated quality gates

## 🚀 Next Steps

1. Update `projectId` in `api/cypress.config.js`
2. Add `CYPRESS_API_RECORD_KEY` to GitHub secrets
3. Push the changes
4. Watch your first API test run! 🎊

## 📸 Expected Results

Once running, you'll see in Cypress Cloud:
- All 4 API test specs (post, get, put, delete)
- Request/response details
- Test duration and performance
- Historical trends
- Flaky test detection
