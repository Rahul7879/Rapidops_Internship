@signupFeature
Feature: Reset Password

  Scenario Outline: Successful password reset
    Given a user with email "<email>" and token "<token>"
    When the user resets the password to "<newPassword>"
    Then the password reset should be successful
    And the reset password response should have a status of 200 and message "Password reset successful"

    Examples:
      | email            | token            | newPassword   |
      | user@example.com | valid-token      | newPassword123 |
      | anotheruser@example.com | another-valid-token | password321 |
      | user3@example.com | yet-another-valid-token | MyNewPassword |

  Scenario Outline: Password reset with invalid token
    Given a user with email "<email>" and token "<token>"
    When the user resets the password to "<newPassword>"
    Then the password reset should fail with a 400 error and message "Invalid or expired token"

    Examples:
      | email            | token            | newPassword   |
      | user@example.com | expired-token    | newPassword123 |
      | invaliduser@example.com | invalid-token | password321 |
      | anotheruser@example.com | another-expired-token | MyNewPassword |
