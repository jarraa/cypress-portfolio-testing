/// <reference types="cypress" />

describe('Contact Section Functionality Test', () => {
    // Contact Link Functionality 
    context('Contact Links', () => {
        beforeEach(() => {
            cy.visit('https://azzahra-portfolio-site.vercel.app/#contact', { timeout: 120000 });
            cy.closeWelcomeModal();
        });

        it('Should open Azzahra LinkedIn Profile in new Tab when the LinkedIn Icon is clicked', () => {
            cy.get('.linkedin-icon').click()
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('include', 'https://www.linkedin.com/in/azzahra-auliya-rahmah-321154148')
        });

        it('Should open Azzahra Github Profile in new Tab when the Github Icon is clicked', () => {
            cy.get('.github-icon').click()
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('include', 'https://github.com/jarraa')
        });

        it('Should open Azzahra Portfolio in new Tab when the Portfolio is clicked', () => {
            cy.contains('View Full Portfolio').click()
            .should('have.attr', 'target', '_blank')
            .and('have.attr', 'href')
            .and('include', 'https://portfolioazzahraauliya.my.canva.site/portfolioazzahraauliyar')
        });
    });

    // Form Functionality 
    context('Form Submit', () => {
        // Test Aktual ketika form dikirim ke Formspree dan menampilkan reCAPTCHA
        it('Should submit the form and display reCAPTCHA page before sending the message', () => {
            cy.visit('https://azzahra-portfolio-site.vercel.app/#contact', { timeout: 120000 });
            cy.closeWelcomeModal();

            cy.get('#name').type('Shifa Amalia').should('have.value', 'Shifa Amalia');
            cy.get('#email').type('shifa1616@gmail.com').should('have.value', 'shifa1616@gmail.com');
            cy.get('#message').type('Hello! I’m testing this contact form.').should('have.value', 'Hello! I’m testing this contact form.');
            cy.get('button[type="submit"]').click();
            cy.url().should('include', 'formspree');
        });

        // Test Simulasi (Mock) dengan uji form tanpa reCAPTCHA
        it('Should allow typing and simulate successful form submission', () => {
            cy.visit('https://azzahra-portfolio-site.vercel.app/#contact', { timeout: 120000 });
            cy.closeWelcomeModal();
            // Buat endpoint palsu di lokal
            cy.intercept('POST', '/mock-endpoint', {
                statusCode: 200,
                body: { ok: true, message: 'Message sent successfully!' },
            }).as('formSubmit');

            cy.get('#name').type('Shifa A').should('have.value', 'Shifa A');
            cy.get('#email').type('shifaaa@gmail.com').should('have.value', 'shifaaa@gmail.com');
            cy.get('#message').type('Hello! This is a test message.').should('have.value', 'Hello! This is a test message.');

            // Ganti action form ke endpoint lokal yang sudah di-mock
            cy.get('form#contactForm')
                .invoke('attr', 'action', '/mock-endpoint')
                .invoke('attr', 'target', '_self'); 

            cy.get('button[type="submit"]').click({ force: true });

            // Tunggu request ke endpoint mock
            cy.wait('@formSubmit').its('response.statusCode').should('eq', 200);
        });

        // Menampilkan error "Please Fill out this field"
        it('Should allow clearing the form fields and cannot submit when fields are empty', () => {
            cy.visit('https://azzahra-portfolio-site.vercel.app/#contact', { timeout: 120000 });
            cy.closeWelcomeModal();
            
            cy.get('#name').type('Shifa').should('have.value', 'Shifa')
                .clear().should('have.value', '');
            cy.get('#email').type('shifa16@gmail.com').should('have.value', 'shifa16@gmail.com')
                .clear().should('have.value', '');
            cy.get('#message').type('Hello!').should('have.value', 'Hello!')
                .clear().should('have.value', ''); 
            cy.get('button[type="submit"]').click()
        });
    });
});