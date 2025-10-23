/// <reference types="cypress"/>

describe('Hamburger Visibility and Functionality Check in Mobile View', () => {
    beforeEach(() => {
        cy.visit('https://azzahra-portfolio-site.vercel.app/', { timeout: 120000 });
        cy.closeWelcomeModal();
    });

    it('Should load all images successfully', () => {
        cy.get('img').each(($img) => {
            cy.wrap($img)
            .should('be.visible')
            .and(($imgEl) => {
                expect($imgEl[0].naturalWidth).to.be.greaterThan(0);
            });
        });
    });
});