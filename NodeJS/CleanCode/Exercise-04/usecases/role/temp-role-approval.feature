Feature: Use case to approve temporary role for a user

  Scenario Outline: Admin should successfully approve a temporary role
    Given token: '<token>' approve temporary role usecase
    When try to approve the temporary role
    Then It should update the role and send an approval email to the user and return success message: '<result>'
    Examples:
      | token                                                                              | result                  |
   #   | validToken                                                                         | Temporary role approved |

  Scenario Outline: It should throw an error for invalid token3
    Given token: '<token>' approve temporary role usecase
    When try to approve the temporary role
    Then It should return the error: '<error>' for temporary role approval
    Examples:
       | token           | error                       |
    #   | invalidToken    | Error: Invalid token        |
