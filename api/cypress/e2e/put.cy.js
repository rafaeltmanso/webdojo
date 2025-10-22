describe('PUT /api/users/:id', () => {
  // Test data setup
  const originalUser = {
    name: 'Peter Parker',
    email: 'parker@stark.com',
    password: '123456',
  }

  const updatedUser = {
    name: 'Spider-Man',
    email: 'spider@marvel.com',
    password: 'pwd123',
  }

  let userId

  // Before Hook - Setup
  before(() => {
    // Clean environment - ensure no duplicate users exist
    cy.task('deleteUser', originalUser.email)
    cy.task('deleteUser', updatedUser.email)

    // Create new user and capture the ID
    cy.postUser(originalUser).then((response) => {
      userId = response.body.user.id
    })
  })

  // Main Test
  it('should update an existing user', () => {
    cy.request({
      method: 'PUT',
      url: `http://localhost:3333/api/users/${userId}`,
      headers: { 'Content-Type': 'application/json' },
      body: updatedUser,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })

  // After Hook - Validation
  after(() => {
    // Perform a GET to ensure the user's data was actually updated
    cy.getUser(userId).then((response) => {
      expect(response.body.name).to.eq(updatedUser.name)
      expect(response.body.email).to.eq(updatedUser.email)
    })
  })
})
