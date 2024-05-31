Feature: User Signup

  Scenario: Successful signup
    Given a user with email "user@example.com" and password "password123" and full name "John Doe"
    When the user attempts to sign up
    Then the signup should be successful with a token

  Scenario Outline: Signup error
    Given a user with email "<email>" and password "<password>" and full name "<fullName>"
    When the user attempts to sign up
    Then the signup should fail with a <status> error and message "<message>"

    Examples:
      | email                | password    | fullName   | status | message                   |
      | existing@example.com | password123 | Jane Doe   | 409    | User already exists       |
      | error@example.com    | password123 | Error Case | 500    | Error during registration |
      | invalid@example.com  | password123 | Invalid User | 500    | Error during registration |
