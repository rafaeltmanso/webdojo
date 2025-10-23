const { realHover } = require('cypress-real-events/commands/realHover')

describe('Simulating Mouseover', () => {
  it('should hover over an element', () => {
    // Skip test in Firefox - realHover uses CDP (Chrome DevTools Protocol)
    if (Cypress.browser.name === 'firefox') {
      cy.log('Skipping realHover test in Firefox - CDP not supported')
      cy.login()
      cy.get('[data-cy="instagram-link"]').trigger('mouseover').should('exist')
      cy.contains('isso é Mouseover!').should('be.visible')
      return
    }

    cy.login()

    cy.contains('isso é Mouseover!').should('not.exist')

    cy.get('[data-cy="instagram-link"]').realHover().should('exist')
  })
})
