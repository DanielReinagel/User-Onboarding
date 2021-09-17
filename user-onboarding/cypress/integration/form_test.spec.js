describe('Form App Tests', ()=>{
    beforeEach(()=>{
        cy.visit('localhost:3000');
    });

    const nameInput = () => cy.get('input[name=name]');
    const emailInput = () => cy.get('input[name=email]');
    const pwInput = () => cy.get('input[name=password]');
    const toSInput = () => cy.get('input[name=toS]');
    const submitBtn = () => cy.get('input[type=submit]');
    const errorsDiv = () => cy.get('div[class=errors]');

    const noName = 'A name is required';
    const noEmail = 'An email is required';
    const noPw = 'A password is required';
    const toSNotChecked = 'You must agree to the Terms of Service';
    const shortName = 'The name must include at least 3 characters';
    const invalidEmail = 'A valid email address is required';
    const shortPw = 'The Password must include at least 3 characters';
    const checkErrors = (array) => {
        if (!array.length){
            errorsDiv().children().should('not.exist');
        } else {
            errorsDiv().children().should('have.length', array.length)
            array.forEach((message, index) => errorsDiv().children().eq(index).should('have.text', message));
        }
    }

    const backspaces = (num) => {
        return '{backspace}'.repeat(num);
    }

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
            toSInput().should('not.be.checked').click().should('be.checked').click().should('not.be.checked');
        });
    });

    describe('Form Errors and Submit Button Disabled', ()=>{
        it('Starting errors', ()=>{
            checkErrors([noName, noEmail, noPw, toSNotChecked]);
        });
        it('Name Errors', ()=>{
            nameInput().type('Te');
            checkErrors([shortName, noEmail, noPw, toSNotChecked]);
            nameInput().type('st Name');
            checkErrors([noEmail, noPw, toSNotChecked]);
            nameInput().type(backspaces(7));
            checkErrors([shortName, noEmail, noPw, toSNotChecked]);
            nameInput().type(backspaces(2));
            checkErrors([noName, noEmail, noPw, toSNotChecked]);
        });
        it('Email Errors', ()=>{
            emailInput().type('TestEmail123@email');
            checkErrors([noName, invalidEmail, noPw, toSNotChecked]);
            emailInput().type('.com');
            checkErrors([noName, noPw, toSNotChecked]);
            emailInput().type(backspaces(4));
            checkErrors([noName, invalidEmail, noPw, toSNotChecked]);
            emailInput().type(backspaces(18));
            checkErrors([noName, noEmail, noPw, toSNotChecked]);
        });
        it('Password Errors', ()=>{
            pwInput().type('Pa');
            checkErrors([noName, noEmail, shortPw, toSNotChecked]);
            pwInput().type('ssword123');
            checkErrors([noName, noEmail, toSNotChecked]);
            pwInput().type(backspaces(9));
            checkErrors([noName, noEmail, shortPw, toSNotChecked]);
            pwInput().type(backspaces(2));
            checkErrors([noName, noEmail, noPw, toSNotChecked]);
        });
        it('Terms of Service Errors', ()=>{
            toSInput().click();
            checkErrors([noName, noEmail, noPw]);
            toSInput().click();
            checkErrors([noName, noEmail, noPw, toSNotChecked]);
        });
        it('Full Form Submission Process Errors', ()=>{
            nameInput().type('Te');
            checkErrors([shortName, noEmail, noPw, toSNotChecked]);
            nameInput().type('st Name');
            checkErrors([noEmail, noPw, toSNotChecked]);

            emailInput().type('TestEmail123@email');
            checkErrors([invalidEmail, noPw, toSNotChecked]);
            emailInput().type('.com');
            checkErrors([noPw, toSNotChecked]);

            pwInput().type('Pa');
            checkErrors([shortPw, toSNotChecked]);
            pwInput().type('ssword123');
            checkErrors([toSNotChecked]);

            toSInput().click();
            checkErrors([]);

            submitBtn().click();
            checkErrors([noName, noEmail, noPw, toSNotChecked]);
        });
    });
    describe('Form Submission Tests', ()=>{
        it('Form Submission Updates', ()=>{
            nameInput().type('Test Name');
            emailInput().type('TestEmail123@email.com');
            pwInput().type('Password123');
            toSInput().click();
            submitBtn().click();
            cy.contains('Test Name').should('exist');
            cy.contains('TestEmail123@email.com').should('exist');
            nameInput().should('have.value', '');
            emailInput().should('have.value', '');
            pwInput().should('have.value', '');
            toSInput().should('not.be.checked');
        });
    });
});