const { realHover } = require('cypress-real-events/commands/realHover')

describe('Simulating Mouseover', () => {
  it('should hover over an element', { browser: '!firefox' }, () => {
    cy.login()

    cy.contains('isso é Mouseover!').should('not.exist')

    cy.get('[data-cy="instagram-link"]').realHover().should('exist')
  })
})
