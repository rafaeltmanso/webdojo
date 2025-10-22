import { personal, company } from '../fixtures/consultancy.json'

describe('Consultancy Form', () => {
  beforeEach(() => {
    cy.login()
    cy.goTo('Formulários', 'Consultoria')
    cy.fixture('consultancy').as('consultancyData')
  })

  it('should request individual consultancy', () => {
    cy.fillConsultancyForm(personal)
    cy.submitConsultancyForm()
    cy.validateConsultancyModal()
  })
  it('should request in-company consultancy', () => {
    cy.fillConsultancyForm(company)
    cy.submitConsultancyForm()
    cy.validateConsultancyModal()
  })
  it('should validate required fields', () => {
    cy.submitConsultancyForm()

    const requiredFields = [
      { label: 'Nome Completo', message: 'Campo obrigatório' },
      { label: 'Email', message: 'Campo obrigatório' },
      {
        label: 'termos de uso',
        message: 'Você precisa aceitar os termos de uso',
      },
    ]

    requiredFields.forEach(({ label, message }) => {
      cy.contains('label', label)
        .parent()
        .find('p')
        .should('be.visible')
        .should('have.text', message)
        .and('have.class', 'text-red-400')
        .and('have.css', 'color', 'rgb(248, 113, 113)')
    })
  })
})
