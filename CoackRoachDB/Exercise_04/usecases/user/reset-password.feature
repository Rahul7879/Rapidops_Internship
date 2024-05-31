Feature: Reset Password

  Scenario: Successful password reset
    Given a user with email "user@example.com" and token "valid-token"
    When the user resets the password to "newPassword123"
    Then the password reset should be successful
    And the reset password response should have a status of 200 and message "Password reset successful"

  Scenario: Password reset with invalid token
    Given a user with email "user@example.com" and token "invalid-token"
    When the user resets the password to "newPassword123"
    Then the password reset should fail with a 400 error and message "Invalid or expired token"
