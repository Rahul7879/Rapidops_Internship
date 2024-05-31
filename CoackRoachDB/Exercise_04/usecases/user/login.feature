Feature: User Login

  Scenario: Successful login
    Given a user with email "user@example.com" and password "password123"
    When the user attempts to login
    Then the login should be successful with a token

  Scenario Outline: Login failure
    Given a user with email "<email>" and password "<password>"
    When the user attempts to login
    Then the login should fail with a <status> error and message "<message>"

    Examples:
      | email                   | password     | status | message                          |
      | nonexisting@example.com | password123  | 404    | Username does not exist          |
      | user@example.com        | wrongpass    | 401    | Password does not match          |
      | user@example.com        |              | 401    | Password is not set yet, change your password |
