Feature: Create, read, update, delete and use with Posts some Tags en Ghost web app 

    Background: Login in Ghost web app
        Given I navigate to the Website
        And I entered email and password
        And I click on login submit button

    Scenario: Create a new Tag
        Given I am logged
        When I navigate to Tags view
        And I navigate to the New Tag view
        And I entered name, color and description
        And I click on Save button
        And I should be send to Edit tag
        And I should see the tag name at top from page
        And I navigate to Tags view
        Then I check the name and slug from tag list

        #Los siguientes pasos no van en el escenario pero se incluyen para mejor manejo de las pruebas
        When I navigate to the Tag by slug
        And I click on Delete tag button
        And I confirm to delete tag
        Then I should be send to Tags view

    Scenario: Create and edit a new Tag
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
        And I edit name, color and description inputs
        And I click on Save button
        And I navigate to Tags view
        Then I check the name and slug from tag list

        #Los siguientes pasos no van en el escenario pero se incluyen para mejor manejo de las pruebas
        When I navigate to the Tag by slug
        And I click on Delete tag button
        And I confirm to delete tag
        Then I should be send to Tags view

    Scenario: Create, edit and add new Tag to a Post
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
        And I edit name, color and description inputs
        And I click on Save button
        And I navigate to Tags view
        And I check the name and slug from tag list
        And I navigate to the Posts view
        And I click on New post Button
        And I entered name to the post
        And I click on Post settings button
        And I add the new Tag to the Post
        And I back to the Posts view
        And I confirm to back to the Posts view
        And I click on the tags filter button from posts
        Then I check in the filter select tag if exists the new tag

        #Los siguientes pasos no van en el escenario pero se incluyen para mejor manejo de las pruebas
        When I right click to last post
        And I click on delete from list
        And I confirm to delete tag
        And I navigate to Tags view
        And I navigate to the Tag by slug
        And I click on Delete tag button
        And I confirm to delete tag
        Then I should be send to Tags view

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