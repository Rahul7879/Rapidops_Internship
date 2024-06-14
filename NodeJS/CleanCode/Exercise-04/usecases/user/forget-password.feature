Feature: Forgot Password

  Scenario: Successful password reset link sent
    Given a user with email "user@example.com"
    When the user requests to reset the password
    Then a password reset link should be sent to the user's email

  Scenario Outline: Password reset link failure
    Given a user with email "<email>"
    When the user requests to reset the password
    Then the password reset link request should fail with a <status> error and message "<message>"

    Examples:
      | email            | status | message          |
      | nonexistent@example.com | 404    | User not found  |
