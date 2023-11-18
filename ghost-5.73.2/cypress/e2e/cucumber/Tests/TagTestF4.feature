Feature: Create, read, update, delete and use with Posts some Tags en Ghost web app 

    Background: Login in Ghost web app
        Given I navigate to the Website
        And I entered email and password
        And I click on login submit button

    Scenario: Create and delete a new Tag
        Given I am logged
        When I navigate to Tags view
        And I navigate to the New Tag view
        And I entered name, color and description
        And I click on Save button
        And I should be send to Edit tag
        And I should see the tag name at top from page
        And I navigate to Tags view
        And I check the name and slug from tag list
        And I navigate to the Tag by slug
        And I click on Delete tag button
        And I confirm to delete tag
        Then I should be send to Tags view