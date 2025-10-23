/// <reference types="cypress" />

describe('Navigation Verification Test', () => {
    beforeEach(() => {
        cy.visit('https://azzahra-portfolio-site.vercel.app/', { timeout: 120000 });
        cy.closeWelcomeModal();
    });

    it('Should Scroll to Home Section when Azzahra Portfolio is clicked', () => {
        cy.get('.title-site').click();
        cy.url().should('include', '#home');
        cy.get('#home').should('be.visible');
    });

    // Navbar Test
    context('Navbar Links', () => {
        it('Should scroll correctly to section target - Navbar Menu', () => {
            cy.verifyMenuScroll('Home', '#home', 'nav');
            cy.verifyMenuScroll('About Me', '#aboutme', 'nav');
            cy.verifyMenuScroll('Projects', '#projects', 'nav');
            cy.verifyMenuScroll('Certificates', '#certificates', 'nav');
            cy.verifyMenuScroll('Contact', '#contact', 'nav');
        });
    });
   
    // Footer Test
    context('Footer Links', () => {
        it('Should scroll correctly to section target - Footer Menu', () => {
            cy.get('footer').scrollIntoView();
            cy.wait(500); 
            cy.verifyMenuScroll('Home', '#home', 'footer');
            cy.verifyMenuScroll('About Me', '#aboutme', 'footer');
            cy.verifyMenuScroll('Projects', '#projects', 'footer');
            cy.verifyMenuScroll('Contact', '#contact', 'footer');
        });
    });
});