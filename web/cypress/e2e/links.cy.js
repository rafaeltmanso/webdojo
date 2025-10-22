describe('Links opening new tab/window', () => {
  beforeEach(() => {
    cy.login()
  })

  it('should validate Instagram link attribute', () => {
    cy.get('[data-cy="instagram-link"]')
      .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
      .should('have.attr', 'target', '_blank')
  })
})
