describe('Form App Tests', ()=>{
    beforeEach(()=>{
        cy.visit('localhost:3000');
    });

    const nameInput = () => cy.get('input[name=name]');
    const emailInput = () => cy.get('input[name=email]');
    const pwInput = () => cy.get('input[name=password]');
    const toSInput = () => cy.get('input[name=toS]');

    it('test self', ()=>{
        expect(2).to.equal(2);
    });
    describe('individual form element tests', ()=>{
        it('name input exists', ()=>{
            nameInput().should('exist');
        });
        it('typed in name input', ()=>{
            nameInput().should('have.value', '').type('Test Name').should('have.value', 'Test Name');
        });
        it('email input exists', ()=>{
            emailInput().should('exist');
        });
        it('typed in email input', ()=>{
            emailInput().should('have.value', '').type('TestEmail123@email.com').should('have.value', 'TestEmail123@email.com');
        });
        it('password input exists', ()=>{
            pwInput().should('exist');
        });
        it('typed in password input', ()=>{
            pwInput().should('have.value', '').type('Password123').should('have.value', 'Password123');
        });
        it('Terms of Service input exists', ()=>{
            toSInput().should('exist');
        });
        it('checked and unchecked Terms of Service checkbox', ()=>{
            toSInput().should('not.be.checked').click().should('be.checked');
            toSInput().should('be.checked').click().should('not.be.checked');
        });
    });

    describe('Form Errors Tests', ()=>{
        it('Starting errors', ()=>{
            cy.contains('A name is required').should('exist');
            cy.contains('An email is required').should('exist');
            cy.contains('A password is required').should('exist');
            cy.contains('You must agree to the Terms of Service').should('exist');
        });
    });
    describe('Form Submission Tests', ()=>{
        it('Form Submission', ()=>{
            nameInput().type('Test Name');
            emailInput().type('TestEmail123@email.com');
            pwInput().type('Password123');
            toSInput().click();
            cy.get('input[type=submit]').click();
            cy.contains('Test Name').should('exist');
            cy.contains('TestEmail123@email.com').should('exist');
        });
    });
});