import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {
  beforeEach(() => {
    cy.start()
  })

  it('should manipulate HTML element attributes', () => {
    cy.log('Manipulating attributes directly')

    // Filling field using invoke
    cy.get('#email').invoke('val', 'papito@teste.com.br')

    // Changing name attribute
    cy.get('#password').invoke('attr', 'name', 'senha')

    // Manipulating button visibility
    cy.contains('button', 'Entrar').invoke('hide').should('not.be.visible')
    cy.contains('button', 'Entrar').invoke('show').should('be.visible')
  })

  it('should validate toast with assert', () => {
    // Fill form with INVALID credentials to generate error toast
    cy.get('#email').type('papito@webdojo.com')
    cy.get('#password').type('wrongpassword')
    cy.contains('button', 'Entrar').click()

    cy.get('.toast .title')
      .should('be.visible')
      .invoke('text')
      .should('equal', 'Acesso negado! Tente novamente.')
  })

  it('should validate toast disappearance', () => {
    cy.get('#email').type('papito@webdojo.com')
    cy.get('#password').type('wrongpassword')
    cy.contains('button', 'Entrar').click()

    // Validates that toast is visible and has correct text
    cy.get('.toast').should('be.visible')

    cy.get('.toast .title').should(
      'have.text',
      'Acesso negado! Tente novamente.'
    )

    // Waits 5 seconds and validates that toast was removed from DOM
    cy.wait(5000)
    cy.get('.toast').should('not.exist')
  })

  it('should submit form by pressing Enter', () => {
    // Simulating physical keyboard keys
    cy.get('#email').type('papito@web.com')
    cy.get('#password').type('senha_incorreta{enter}')

    // Validates that form was submitted (error toast appears)
    cy.get('.toast').should('be.visible')

    cy.get('.toast .title').should('contain', 'Acesso negado')
  })

  it('should simulate TAB key to navigate between fields', () => {
    // Using realPress from cypress-real-events for TAB navigation
    // Skip in Firefox - realPress uses CDP (Chrome DevTools Protocol)
    if (Cypress.browser.name === 'firefox') {
      cy.log('Skipping realPress test in Firefox - CDP not supported')
      cy.get('#email').type('papito@web.com{tab}')
      cy.focused().should('have.attr', 'id', 'password')
      return
    }

    cy.get('#email').type('papito@web.com')
    cy.get('#email').realPress('Tab')
    cy.focused().should('have.attr', 'id', 'password')
  })

  it('should simulate other useful keys', () => {
    // Backspace - delete characters
    cy.get('#email').type('teste@exemplo.com')
    cy.get('#email').type('{backspace}{backspace}{backspace}br')

    // Escape - useful for closing modals (illustrative example)
    cy.get('#password').type('123456{esc}')

    // Arrows - navigation (example with field)
    cy.get('#email').type('{selectall}novo@email.com')
  })

  it('should generate fake data with Faker.js', () => {
    // ✅ Creating fake data for a single user
    const name = faker.person.fullName()
    const email = faker.internet.email()
    const password = 'pwd123' // Standardized password for test environment

    cy.log(`Name: ${name}`)
    cy.log(`Email: ${email}`)
    cy.log(`Password: ${password}`)

    // Using the data to fill the form
    cy.get('#email').type(email)
    cy.get('#password').type(password)
  })

  it('should generate multiple users with Lodash and Faker', () => {
    // Creating 5 fake users at once
    _.times(5, (index) => {
      const name = faker.person.fullName()
      const email = faker.internet.email()
      const password = 'pwd123'

      cy.log(`--- User ${index + 1} ---`)
      cy.log(`Name: ${name}`)
      cy.log(`Email: ${email}`)
      cy.log(`Password: ${password}`)
    })

    // You can increase to 100, 1000 or more for data load
    // Ideal for populating forms or testing API endpoints in bulk
  })

  it('should create data load for testing', () => {
    // Practical example: generating 10 users and validating
    const userCount = 10

    _.times(userCount, (index) => {
      const userData = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        password: 'pwd123',
      }

      cy.log(`User ${index + 1}: ${userData.name} - ${userData.email}`)
    })
  })

  it('should register multiple users (practical application)', () => {
    // Registering 5 users with dynamic data
    _.times(5, (index) => {
      // IMPORTANT: cy.visit inside the loop so each iteration starts in the correct state
      cy.goToSignup() // or cy.visit('/signup')

      const name = faker.person.fullName()
      const email = faker.internet.email()
      const password = 'pwd123'

      cy.log(`--- Registering User ${index + 1} ---`)

      // Fills the registration form
      cy.get('#name').type(name)
      cy.get('#email').type(email)
      cy.get('#password').type(password)
      cy.contains('button', 'Criar conta').click()

      // Validates successful registration
      cy.contains('Conta criada com sucesso!').should('be.visible')
    })
  })
})
