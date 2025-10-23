// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Fungsi tutup modal 
Cypress.Commands.add('closeWelcomeModal', () => {
  cy.get('body').then(($body) => {
    if ($body.find('#welcomeModal').length > 0) {
        cy.get('#welcomeModal').should('be.visible');
        cy.get('#nameInput').type('shifa');
        cy.get('#submitName').click();
        cy.get('#welcomeModal').should('not.be.visible');
        cy.get('#username').should('contain', 'Shifa')
    }
  })
});

// Fungsi Verifikasi Menu utk Navbar dan Footer
Cypress.Commands.add('verifyMenuScroll', (menuText, targetId, scope = 'body') => {
  cy.get(scope).find('a').contains(menuText, { matchCase: false })
    .click({ scrollBehavior: false, force: true });

  cy.url().should('include', targetId);

  cy.get(targetId)
    .should('exist')
    .then(($section) => {
      cy.window().then((win) => {
        const rect = $section[0].getBoundingClientRect();
        expect(rect.top).to.be.closeTo(0, 120);
      });
    });
});



