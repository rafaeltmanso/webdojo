const { realHover } = require('cypress-real-events/commands/realHover')

describe('Simulating Mouseover', () => {
  it('should hover over an element', () => {
    // Skip test in Firefox - realHover uses CDP (Chrome DevTools Protocol)
    if (Cypress.browser.name === 'firefox') {
      cy.log('Skipping realHover test in Firefox - CDP not supported')
      cy.login()

      // Firefox fallback: trigger mouseover and wait for the text to appear
      cy.get('[data-cy="instagram-link"]').trigger('mouseover', { force: true })
      cy.contains('isso é Mouseover!', { timeout: 10000 }).should('be.visible')
      return
    }

    cy.login()

    cy.contains('isso é Mouseover!').should('not.exist')

    cy.get('[data-cy="instagram-link"]').realHover().should('exist')
  })
})
