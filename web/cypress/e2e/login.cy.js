import { getTodayFormattedDate } from '../support/utils'

describe('Login', () => {
  it('should login successfully', () => {
    cy.start()
    cy.submitLoginform('papito@webdojo.com', 'katana123')
    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and(
        'have.text',
        'Olá QA, esse é o seu Dojo para aprender Automação de Testes.'
      )

    cy.getCookie('login_date')
      .should('exist')
      .then((cookie) => {
        expect(cookie.value).to.eq(getTodayFormattedDate())
      })

    cy.window().then((win) => {
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[A-Fa-f0-9]{32}$/)
    })
  })

  it('should not login with invalid password', () => {
    cy.start()
    cy.submitLoginform('papito@webdojo.com', 'katana321')
    cy.contains('Acesso negado! Tente novamente.').should('be.visible')
  })

  it('should not login with unregistered email', () => {
    cy.start()
    cy.submitLoginform('404@webdojo.com', 'katana123')
    cy.contains('Acesso negado! Tente novamente.').should('be.visible')
  })
})
