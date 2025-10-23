/// <reference types="cypress"/>

describe('Hamburger Visibility and Functionality Check in Mobile View', () => {
    beforeEach(() => {
        cy.visit('https://azzahra-portfolio-site.vercel.app/', { timeout: 120000 });
        cy.closeWelcomeModal();
        cy.viewport(360, 640);
    });

    it('Should open and close hamburger Menu when is clicked', () => {
        cy.get('.hamburger').should('be.visible').click();
        cy.get('.nav-menu').should('be.visible');
        cy.get('.hamburger').click();
        cy.get('.nav-menu').should('not.be.visible');
    });

    it('Should navigate correctly when each menu is clicked', () => {
        cy.get('.hamburger').should('be.visible');

        const menus = [
            { text: 'Home', target: '#home' },
            { text: 'About Me', target: '#aboutme' },
            { text: 'Projects', target: '#projects' },
            { text: 'Certificates', target: '#certificates' },
            { text: 'Contact', target: '#contact' }
        ];

        menus.forEach(({ text, target }) => {
            cy.get('.hamburger').click();
            cy.get('.nav-menu').contains(text).click();
            cy.url().should('include', target);
            cy.get('.nav-menu').should('not.be.visible');
        });
    });
});