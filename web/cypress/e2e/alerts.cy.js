describe('JavaScript Alert Validation', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Alertas JS', 'JavaScript Alerts')
  })

  it('should validate simple alert', () => {
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Olá QA, eu sou um Alert Box!')
    })

    cy.contains('button', 'Mostrar Alert').click()
  })

  it('should confirm a dialog and validate positive response', () => {
    cy.on('window:confirm', (msg) => {
      expect(msg).to.be.equal('Aperte um botão!')
      return true // Simulates clicking "Ok"
    })

    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Você clicou em Ok!')
    })

    cy.contains('button', 'Mostrar Confirm').click()
  })

  it('should cancel a dialog and validate negative response', () => {
    cy.on('window:confirm', (msg) => {
      expect(msg).to.be.equal('Aperte um botão!')
      return false // Simulates clicking "Cancel"
    })
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Você cancelou!')
    })

    cy.contains('button', 'Mostrar Confirm').click()
  })

  it('should fill a prompt and validate the entered value', () => {
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Fernando')
    })
    cy.on('window:alert', (msg) => {
      expect(msg).to.be.equal('Olá Fernando! Boas-vindas ao WebDojo!')
    })

    cy.contains('button', 'Mostrar Prompt').click()
  })
})
