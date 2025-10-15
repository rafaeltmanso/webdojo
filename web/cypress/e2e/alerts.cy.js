
describe('Validação de Alertas em Javascript', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar o alerta simples', () => {
        cy.on('window:alert', (msg) => {
            expect(msg).to.be.equal('Olá QA, eu sou um Alert Box!')
        })

        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um diálogo e validar resposta positiva', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.be.equal('Aperte um botão!')
            return true // Simula o clique em "Ok"
        })

        cy.on('window:alert', (msg) => {
            expect(msg).to.be.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um diálogo e validar resposta negativa', () => {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.be.equal('Aperte um botão!')
            return false // Simula o clique em "Cancelar"
        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.be.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve preencher um prompt e validar o valor digitado', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Fernando')

        })
        cy.on('window:alert', (msg) => {
            expect(msg).to.be.equal('Olá Fernando! Boas-vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })
})