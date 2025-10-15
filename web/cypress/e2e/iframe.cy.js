describe('Interagindo com iFrame', () => {
    it('Deve tocar o video de exemplo', () => {
        cy.login()

        cy.contains('Video').click()
        cy.wait(3000) //espera o iframe carregar

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            .its('0.contentDocument.body')
            .then(cy.wrap)
            .as('iFrameplayer')

        cy.get('@iFrameplayer')
            .find('.play-button')
            .click()

        cy.get('@iFrameplayer')
            .find('.pause-button')
            .should('be.visible')
    })
})
