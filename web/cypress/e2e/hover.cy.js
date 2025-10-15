const { realHover } = require('cypress-real-events/commands/realHover')

describe('Simulando Mouseover', () => {
    it('Deve fazer hover em um elemento', () => {
        cy.login()

        cy.contains('isso é Mouseover!').should('not.exist')

        cy.get('[data-cy="instagram-link"]').realHover().should('exist')
    })
}) 