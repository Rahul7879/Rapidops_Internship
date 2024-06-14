Feature: User Signup

  Scenario Outline: Successful signup
    Given a user with email "<email>" and password "<password>" and full name "<fullName>"
    When the user attempts to sign up
    Then the signup should be successful with a token

    Examples:
      | email              | password    | fullName   |
      | user1@example.com  | password123 | John Doe   |
      | user2@example.com  | password456 | Jane Smith |
      | user3@example.com  | password789 | Bob Brown  |

  Scenario Outline: Signup error
    Given a user with email "<email>" and password "<password>" and full name "<fullName>"
    When the user attempts to sign up
    Then the signup should fail with a <status> error and message "<message>"

    Examples:
      | email                | password    | fullName     | status | message                     |
      | existing@example.com | password123 | Jane Doe     | 409    | User already exists         |
      | error@example.com    | password123 | Error Case   | 500    | Error during registration   |
      | invalid@example.com  | password123 | Invalid User | 500    | Error during registration   |
