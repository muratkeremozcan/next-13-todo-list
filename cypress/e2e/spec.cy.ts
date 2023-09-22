describe('e2e sanity', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.getByCy('todos').should('be.visible')
  })

  const newTodo =  () => {
    cy.intercept('GET', '/new*').as('newTodo')
    cy.getByCy('new').click()
    cy.wait('@newTodo')
    return cy.location('pathname').should('eq', '/new')
  }
  const todoTitle = `todo-${Cypress._.random(1, 100)}`

  it('should CRUD a todo', () => {
    newTodo()
    
    cy.intercept('POST', '/new').as('createTodo')
    cy.getByCy('title').type(todoTitle, {delay: 0})
    cy.getByCy('create').click()
    cy.wait('@createTodo')
    cy.location('pathname').should('eq', '/')

    cy.intercept('POST', '/').as('UDTodo')
    cy.getByCy(`check-${todoTitle}`).click()
    cy.wait('@UDTodo')

    cy.getByCy(`delete-${todoTitle}`).click()
    cy.wait('@UDTodo')

    cy.getByCyLike(`${todoTitle}`).should('not.exist')
  })

  it('should cover the cancel flow', () => {
    newTodo()
    
    cy.getByCy('create')
    cy.getByCy('title').type(todoTitle, {delay: 0})

    cy.getByCy('cancel').click()
    cy.location('pathname').should('eq', '/')

    cy.getByCyLike(`${todoTitle}`).should('not.exist')
  })
})
