const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '6kucyi',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalStudio: true,
    baseUrl: 'http://localhost:3000',
  },
})
