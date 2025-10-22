describe('User Registration', () => {
  beforeEach(() => {
    cy.goToSignup()

    cy.intercept('POST', 'http://localhost:3333/api/users/register', {
      statusCode: 201,
      body: {
        message: 'Usuário cadastrado com sucesso',
      },
    }).as('postSignup')
  })

  it('should register a new user', () => {
    cy.get('#name').type('Fernando Papito')
    cy.get('#email').type('papito@teste.com.br')
    cy.get('#password').type('123456')
    cy.contains('button', 'Criar conta').click()

    // cy.wait('@postSignup')

    cy.contains('Conta criada com sucesso!').should('be.visible')
  })
})
