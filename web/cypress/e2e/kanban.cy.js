describe('Kanban Board', () => {
    it(' Deve mover uma tarefa de Todo para oone e atualizar o board', () => {
        cy.login()

        cy.contains('Kanban').click()

        const dataTransfer = new DataTransfer()

        cy.contains('div[draggable=true]', 'Documentar API')
            .trigger('dragstart', { dataTransfer })

        cy.get('.column-done')
            .trigger('drop', { dataTransfer })
            .find('h3')
            .should('have.text', 'Done (4)')

        cy.get('.column-done')
            .should('contain.text', 'Documentar API')
            .and('contain.text', 'Criar documentação da API com Swagger')
    })
})