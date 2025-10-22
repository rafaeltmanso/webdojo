const heroes = require('../fixtures/heroes')

describe('GET /api/users', () => {
  before(() => {
    // Delete and register all heroes before tests
    heroes.forEach((hero) => {
      cy.task('deleteUser', hero.email)
      cy.postUser(hero)
    })
  })

  it('should return a list of users', () => {
    cy.getUsers().then((response) => {
      expect(response.status).to.eql(200)
      expect(response.body).to.be.an('array')
      expect(response.body.length).to.be.at.least(heroes.length)
      heroes.forEach((hero) => {
        const found = response.body.find((user) => user.email === hero.email)
        expect(found).to.exist
        expect(found.name).to.eql(hero.name)
        expect(found).to.have.property('id')
        expect(found).to.not.have.property('password')
      })
    })
  })
})
