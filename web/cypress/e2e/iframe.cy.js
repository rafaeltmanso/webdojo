describe('Interacting with iFrame', () => {
  it('should play the example video', () => {
    cy.login()

    cy.contains('Video').click()
    cy.wait(3000) // wait for iframe to load

    cy.get('iframe[title="Video Player"]')
      .should('exist')
      .its('0.contentDocument.body')
      .then(cy.wrap)
      .as('iFrameplayer')

    cy.get('@iFrameplayer').find('.play-button').click()

    cy.get('@iFrameplayer').find('.pause-button').should('be.visible')
  })
})
