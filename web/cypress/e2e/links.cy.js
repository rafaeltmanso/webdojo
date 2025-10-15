describe('Links abrindo nova guia/janela', () => {

    beforeEach(() => {
        cy.login()
    })

    it('Valindando o atributo do link do Instagram', () => {


        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .should('have.attr', 'target', '_blank')

    })
})