describe('DELETE /api/users/:id', () => {
  const user = {
    name: 'Bruce Banner',
    email: 'hulk@marvel.com',
    password: 'pwd123',
  }

  let userId

  before(() => {
    cy.task('deleteUser', user.email)
    cy.api('POST', '/api/users/register', user).then((response) => {
      userId = response.body.user.id
      cy.log('User ID:', userId)
    })
  })

  it('should remove an existing user', () => {
    cy.api({
      method: 'DELETE',
      url: `/api/users/${userId}`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })

  after(() => {
    cy.api('GET', '/api/users').then((response) => {
      const hulk = response.body.find((u) => u.id === userId)
      expect(hulk).to.be.undefined
    })
  })

  context('When the user ID does not exist', () => {
    const user = {
      name: 'Tony Stark',
      email: 'stark@marvel.com',
      password: '123456',
    }

    let userId

    before(() => {
      cy.task('deleteUser', user.email)
      cy.api('POST', '/api/users/register', user).then((res) => {
        userId = res.body.user.id
        cy.task('deleteUser', user.email)
      })
    })

    it('should return 404 User not found', () => {
      cy.api({
        method: 'DELETE',
        url: `/api/users/${userId}`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404)
        expect(response.body.error).to.eq('User not found!')
      })
    })
  })
})
