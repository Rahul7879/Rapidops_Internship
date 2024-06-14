@role
Feature: Use case to accept Roles with token

  Scenario Outline: User should successfully accept a role
    Given a token: '<token>'
    When try to accept role
    Then It should return a success message: '<message>'

    Examples:
      | token                          | message                   |
      | valid_token_with_correct_data  | Role updated successfully |

  Scenario Outline: It should throw error for role acceptance
    Given a token: '<token>'
    When try to accept role
    Then It should return the error: '<error>' for accept request

    Examples:
      | token                          | error                                           |
      | invalid_token                  | Invalid token                                    |
      | valid_token_with_invalid_role  | Role update failed or role already assigned      |
