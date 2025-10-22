const { defineConfig } = require('cypress')
const { deleteUserByEmail } = require('./cypress/support/database')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3333',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        deleteUser(email) {
          return deleteUserByEmail(email)
        },
      })
    },
  },
})
