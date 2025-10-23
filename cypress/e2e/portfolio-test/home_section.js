/// <reference types="cypress" />

describe('Home Section Functionality Test', () => {
    beforeEach(() => {
        cy.visit('https://azzahra-portfolio-site.vercel.app/#home', { timeout: 120000 });
        cy.closeWelcomeModal();
    });

    it('should scroll to Projects Section when the View Project Button is clicked', () => {
        cy.contains('View Projects').scrollIntoView().click({ force: true });
        cy.url().should('include', '#projects');
        cy.get('#projects').should('be.visible');
    });

    it('should download CV successfully when the Download CV button is clicked', () => {
        cy.get('a[href$="attachment/CV-IT_Azzahra Auliya Rahmah.pdf"]')
            .scrollIntoView().click({ force: true })
            .should('have.attr', 'download')
            .and('include', 'Azzahra_Auliya_Rahmah_CV.pdf');
    });
});