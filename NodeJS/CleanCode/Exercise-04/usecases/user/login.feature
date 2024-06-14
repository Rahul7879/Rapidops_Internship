Feature: User Login

  Scenario Outline: Successful login
    Given a user with email "<email>" and password "<password>"
    When the user attempts to login
    Then the login should be successful with a token

    Examples:
      | email           | password    |
      | user1@example.com | password123 |
      | user2@example.com | password456 |
      | user3@example.com | password789 |

  Scenario Outline: Login failure
    Given a user with email "<email>" and password "<password>"
    When the user attempts to login
    Then the login should fail with a <status> error and message "<message>"

    Examples:
      | email                   | password     | status | message                          |
      | nonexisting@example.com | password123  | 404    | Username does not exist          |
      | user@example.com        | wrongpass    | 401    | Password does not match          |
      | user@example.com        |              | 401    | Password is not set yet, change your password |
