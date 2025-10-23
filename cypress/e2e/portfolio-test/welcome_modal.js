/// <reference types="cypress" />

describe('Welcome Modal Test', () => {
    beforeEach(() => {
        cy.visit('https://azzahra-portfolio-site.vercel.app/', { timeout: 120000 });
    });

    it('Displays entered name in welcome message', () => {
        cy.get('#welcomeModal').should('be.visible');
        cy.get('#nameInput').type('shifa');
        cy.get('#submitName').click();
        cy.get('#welcomeModal').should('not.be.visible');
        cy.get('#username').should('contain', 'Shifa')
    });

    it('Shows error when name field is empty', () => {
        cy.get('#welcomeModal').should('be.visible');
        cy.get('#submitName').click();
        cy.on('window:alert', (alertText) => {
          expect(alertText).to.equal('Please enter your name!');
        });
    });
});
