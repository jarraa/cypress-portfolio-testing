/// <reference types="cypress" />

describe('Certificates Section Functionality Test', () => {
    beforeEach(() => {
        cy.visit('https://azzahra-portfolio-site.vercel.app/#certificates', { timeout: 120000 });
        cy.closeWelcomeModal();      
    });

    it('Should scroll to the right when the Right Arrow is clicked', () => {
        cy.get('#scrollContainer')
        .then($before => {
            const initialScroll = $before[0].scrollLeft;
            cy.get('#scrollRight').click();
            cy.wait(500); 
            cy.get('#scrollContainer').should($after => {
                expect($after[0].scrollLeft).to.be.greaterThan(initialScroll);
            });
        });
    });

    it('Should scroll to the left when the Left Arrow is clicked', () => {
        cy.get('#scrollContainer').then(($container) => {
            const container = $container[0];
            // scroll to the right first
            cy.get('#scrollRight').click();
            cy.wait(800);
            cy.window().then(() => {
                const scrolledRight = container.scrollLeft;
                expect(scrolledRight).to.be.greaterThan(0); 

                // scroll to the left
                cy.get('#scrollLeft').click();
                cy.wait(800);
                cy.window().then(() => {
                    const afterScrollLeft = container.scrollLeft;
                    expect(afterScrollLeft).to.be.lessThan(scrolledRight);
                });
            });
        });
    });

    it('Should open Google Drive in new tab when the Link is clicked', () => {
        cy.contains('View Full Certificate').click()
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('include', 'https://drive.google.com/drive/folders/148E7gaYqkdEac74oWAf-233ZMsZYgu45?usp=sharing')
    });
});