import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('TransitionAborted') || err.message.includes('TaskCancelation')) {
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

When("I navigate to Tags view", () => {
    cy.get('a[data-test-nav="tags"]').click();
});

And("I navigate to the New Tag view", () => {
    cy.contains('New tag').click();
});

And("I entered name, color and description", () => {
    cy.fixture('createTag').then((tags) => {
        nameTag = tags.name;
        cy.get('input[data-test-input="tag-name"]').type(tags.name, {force: true});
        cy.get('input[data-test-input="accentColor"]').type(tags.color, {force: true});
        cy.get('textarea[data-test-input="tag-description"]').type(tags.description, {force: true});
    });
});

And("I click on Save button", () => {
    cy.get('button[data-test-button="save"]').click();
    cy.wait(1000)
    cy.get('input[data-test-input="tag-slug"]').invoke('val').then(text => {
        slugTag = text;
    });
});

And("I should be send to Edit tag", () => {
    cy.get('.gh-canvas-breadcrumb').should('contain', 'Edit tag');
});

And("I should see the tag name at top from page", () => {
    cy.get('h2[data-test-screen-title]').should('contain', nameTag);
});

Then("I check the name and slug from tag list", () => {
    cy.get('h3[data-test-tag-name]').should('contain', nameTag)
    cy.get('a[data-test-tag-slug]').should('contain', slugTag)
});

When("I navigate to the Tag by slug", () => {
    cy.get(`span[title="${slugTag}"]`).click()
});

And("I click on Delete tag button", () => {
    cy.get('button[data-test-button="delete-tag"').click();
});

And("I confirm to delete tag", () => {
    cy.get('button[data-test-button="confirm"]').click();
    cy.wait(2000)
});

Then("I should be send to Tags view", () => {
    cy.url().then((url) => {
        cy.url().should('eq', 'http://localhost:2368/ghost/#/tags');
    })
});

And("I edit name, color and description inputs", () => {
    cy.fixture('editTag').then((tags) => {
        nameTag = tags.name;
        cy.get('input[data-test-input="tag-name"]').clear().type(tags.name, {force: true});
        cy.get('input[data-test-input="accentColor"]').clear().type(tags.color, {force: true});
        cy.get('textarea[data-test-input="tag-description"]').clear().type(tags.description, {force: true});
    });
});

When("I navigate to the Posts view", () => {
    cy.get('a[data-test-nav="posts"]').click();
});

And("I click on New post Button", () => {
    cy.get('a[data-test-new-post-button]').click();
});

And("I entered name to the post", () => {
    cy.get('textarea[data-test-editor-title-input]').type('TestPost');
});

And("I click on Post settings button", () => {
    cy.get('button[data-test-psm-trigger]').click();
});

And("I add the new Tag to the Post", () => {
    cy.get('input[type="search"]').then(item => {
        cy.wrap(item.get(0)).type(nameTag, {force: true});
        cy.get('[data-option-index="0"]').click();
    });
});

And("I back to the Posts view", () => {
    cy.get('a[data-test-breadcrumb]').click();
});

And("I confirm to back to the Posts view", () => {
    cy.get('button.gh-btn-red').click();
});

And('I click on the tags filter button from posts', () => {
    cy.get('span.ember-power-select-selected-item').contains('All tags').click()
    cy.wait(2000);
});

Then("I check in the filter select tag if exists the new tag", () => {
    cy.get('li.ember-power-select-option').should('contain', nameTag);
});

When("I right click to last post", () => {
    cy.get('h3.gh-content-entry-title').contains('TestPost').trigger('contextmenu');
});

And("I click on delete from list", () => {
    cy.get('span.red').click();
});


