import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('TransitionAborted') || err.message.includes('TaskCancelation') || err.message.includes('NiceModal.Provider')) {
        return false;
    }
    
    return true;
});

let slugTag;
let nameTag;

Given("I navigate to the Website", () => {
    cy.visit("http://localhost:2368/ghost/");
});

And("I entered email and password", () => {
    cy.fixture('credentials').then((credentials) => {
        cy.get('input[name="identification"]').type(credentials.email, {force: true})
        cy.get('input[name="password"]').type(credentials.password, {force: true})
    });
});

And("I click on login submit button", () => {
    cy.get('button[type="submit"]').click()
});

Given("I am logged", () => {
    cy.url().then((url) => {
        cy.url().should('eq', 'http://localhost:2368/ghost/#/dashboard');
    })
});

When("I click on avatar icon", () => {
    cy.get('.gh-user-avatar').click()
    cy.wait(1000)
});

And("I click on Your profile", () => {
    cy.get('[data-test-nav="user-profile"]').click()
});

And("I click on Change password button", () => {
    cy.contains('span', 'Change password').click();
});

And("I click on Save & close button", () => {
    cy.contains('span', 'Save & close').click();
});

And("I entered old password", () => {
    cy.fixture('credentials').then((credentials) => {
        cy.get('input.peer[type="password"]').then(inputs => {
            var inputText = inputs.get(0);
            cy.wrap(inputText).type(credentials.password, {force: true});
        });
    });
    
});

And("I entered new password twice", () => {
    cy.fixture('credentials').then((profile) => {
        cy.get('input.peer[type="password"]').then(inputs => {
            var inputText = inputs.get(0);
            inputText = inputs.get(1);
            cy.wrap(inputText).type(profile.password, {force: true});
            cy.wait(1000)
            inputText = inputs.get(2);
            cy.wrap(inputText).type(profile.password, {force: true});
        });
    });
});

And("I back to Dashboard view", () => {
    cy.get('[data-testid="exit-settings"]').click();
});

And("I click on avatar icon", () => {
    cy.get('.gh-user-avatar').click()
    cy.wait(1000)
});

And("I click on Sign out", () => {
    cy.get('.user-menu-signout').click()
});

And("I entered with email and new password", () => {
    cy.fixture('profile').then((profile) => {
        cy.get('input[name="identification"]').type(profile.email, {force: true})
        cy.get('input[name="password"]').type(profile.password, {force: true})
    });
});

Then("I am logged", () => {
    cy.url().then((url) => {
        cy.url().should('eq', 'http://localhost:2368/ghost/#/dashboard');
    })
});