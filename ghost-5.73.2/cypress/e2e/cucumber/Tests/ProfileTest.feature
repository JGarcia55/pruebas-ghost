Feature: Update user profile using Ghost web app

    Background: Login in Ghost web app
        Given I navigate to the Website
        And I entered email and password
        And I click on login submit button

    Scenario: Update user profile
        Given I am logged
        When I click on avatar icon
        And I click on Your profile
        And I click on Change password button
        And I entered old password
        And I entered new password twice
        And I click on Change password button
        And I click on Save & close button
        And I back to Dashboard view
        And I click on avatar icon
        And I click on Sign out
        And I entered with email and new password
        And I click on login submit button
        Then I am logged