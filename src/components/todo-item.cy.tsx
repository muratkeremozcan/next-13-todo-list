// TODO: enable the line and make styles work
// import '../app/globals.css'
import {TodoItem} from './todo-item'

describe('TodoItem', () => {
  // wish this worked
  // beforeEach(() => {
  //   // Add the anchor element expected by Next.js CSS loading mechanism
  //   const anchorElement = document.createElement('div')
  //   anchorElement.id = '__next_css__DO_NOT_USE__'
  //   document.head.appendChild(anchorElement)
  // })

  it('should toggle and delete todo', () => {
    const id = '42'
    const title = 'Buy milk'
    cy.mount(
      <TodoItem
        id={id}
        title={title}
        complete={false}
        toggleTodo={cy.stub().as('toggleTodo')}
        deleteTodo={cy.stub().as('deleteTodo')}
      />,
    )

    cy.getByCy(`check-${title}`).click()
    cy.get('@toggleTodo').should('be.calledWith', id, true)
    cy.getByCy(`check-${title}`).click()
    cy.get('@toggleTodo').should('be.calledWith', id, false)

    cy.getByCy(`delete-${title}`).click()
    cy.get('@deleteTodo').should('be.calledWith', id)
  })
})
