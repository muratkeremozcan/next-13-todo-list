import {defineConfig} from 'cypress'
// import plugins from './cypress/support/plugins'
import tasks from './cypress/support/tasks'

export default defineConfig({
  // @ts-expect-error - experimentalSingleTabRunMode is not in the type definition
  experimentalSingleTabRunMode: true,

  projectId: 'nep1o8',

  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      return tasks(on)
      // return plugins(on, config)
    },
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
