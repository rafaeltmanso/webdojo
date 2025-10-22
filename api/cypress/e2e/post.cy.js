describe('POST /api/users/register', () => {
  it('should register a new user', () => {
    const user = {
      name: 'Wolverine',
      email: 'logan@example.com',
      password: 'pwd123',
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eql(201)
      expect(response.body.message).to.eql('User registered successfully!')
      expect(response.body.user.id).to.match(/^-?\d+$/)
      expect(response.body.user.name).to.eql(user.name)
      expect(response.body.user.email).to.eql(user.email)
    })
  })

  it('should not register a user with an existing email', () => {
    const user = {
      name: 'Cyclops',
      email: 'scott@example.com',
      password: 'pwd123',
    }
    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eql(201)
    })

    cy.postUser(user).then((response) => {
      expect(response.status).to.eql(409)
      expect(response.body.error).to.eql('Email already registered!')
    })
  })

  it('name is required', () => {
    const user = {
      email: 'test@example.com',
      password: 'pwd123',
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.error).to.eql('Name is required!')
    })
  })

  it('email is required', () => {
    const user = {
      name: 'John Doe',
      password: 'pwd123',
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.error).to.eql('Email is required!')
    })
  })

  it('password is required', () => {
    const user = {
      name: 'Jane Smith',
      email: 'jane@example.com',
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eql(400)
      expect(response.body.error).to.eql('Password is required!')
    })
  })

  it('should not accept invalid JSON', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3333/api/users/register',
      body: 'invalid json string',
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eql(400)
    })
  })
})
