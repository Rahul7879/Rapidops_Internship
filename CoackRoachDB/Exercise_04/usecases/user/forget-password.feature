Feature: Forgot Password

  Scenario: Successful password reset request
    Given a user with email "user@example.com"
    When the user requests a password reset
    Then the password reset link should be sent to the email
    And the response should have a status of 200 and message "Password reset link sent to email"

