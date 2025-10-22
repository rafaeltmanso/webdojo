import address from '../fixtures/cep.json'

describe('ZIP Code', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Integração', 'Consulta de CEP')
  })
  it('should query a valid ZIP code', () => {
    cy.get('#cep').type(address.cep)
    cy.contains('button', 'Buscar').click()
    cy.get('#street').should('have.value', address.street)
    cy.get('#neighborhood').should('have.value', address.neighborhood)
    cy.get('#city').should('have.value', address.city)
    cy.get('#state').should('have.value', address.state)
  })
})
