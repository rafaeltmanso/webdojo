import address from '../fixtures/cep.json'

describe('CEP Tests', () => {
  beforeEach(() => {
    cy.login()

    // Mock the external API to avoid flakiness
    cy.intercept('GET', 'https://viacep.com.br/ws/*/json/', {
      statusCode: 200,
      body: {
        cep: '04534-011',
        logradouro: 'Rua Joaquim Floriano',
        bairro: 'Itaim Bibi',
        localidade: 'São Paulo',
        uf: 'SP',
      },
    }).as('getCep')

    cy.goTo('cep', 'Buscar CEP')
  })

  it('should fetch address by CEP', () => {
    cy.get('#cep').type('04534011')

    cy.wait('@getCep')

    cy.get('#street').should('have.value', 'Rua Joaquim Floriano')
    cy.get('#neighborhood').should('have.value', 'Itaim Bibi')
    cy.get('#city').should('have.value', 'São Paulo')
    cy.get('#state').should('have.value', 'SP')
  })
})
