/// <reference types="cypress"/>

describe('Element Visibility and Overflow Check at Various Screen Sizes', () => {

    const viewports = [
        [1920, 1080], // Desktop
        [1024, 768],  // Tablet
        [375, 667],   // Mobile
    ];

    beforeEach(() => {
        cy.visit('https://azzahra-portfolio-site.vercel.app/', { timeout: 120000 });
        cy.closeWelcomeModal();
    });

    viewports.forEach(([width, height]) => {
        it(`Should not have horizontal overflow and display main elements on ${width}x${height}`, () => {
            cy.viewport(width, height);

            // Cek overflow horizontal
            cy.window().then((win) => {
                const doc = win.document.documentElement;
                const hasOverflowX = doc.scrollWidth > doc.clientWidth;
                expect(hasOverflowX, `Overflow detected at ${width}x${height}`).to.be.false;
            });

            // Cek visibility elemen utama
            cy.get('header').should('be.visible');
            cy.get('main').should('be.visible');
            cy.get('footer').should('be.visible');
        });
    });
});
