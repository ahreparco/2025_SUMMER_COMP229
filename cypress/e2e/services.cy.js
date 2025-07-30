describe('Services Page', () => {
  it('shows the Services heading and main sections', () => {
    cy.visit('http://localhost:5173/services')

    cy.contains('h1', 'Services')
    cy.contains('Website Development')
    cy.contains('API Creation and Integration')
    cy.contains('Database Design and Management')
    cy.contains('User Interface and User Experience Improvements')
    cy.contains('Performance Optimization')
    cy.contains('Code Audits and Refactoring')
    cy.contains('Ongoing Maintenance and Support')
    cy.contains('Deployment and DevOps Setup')
    cy.contains('Technical Consultation and Planning')
  })
})