Feature: Use case to request temporary role for a user

  Scenario Outline: User should successfully request a temporary role
    Given email: '<email>', tenantId: '<tenantId>', userId: '<userId>', roleId: '<roleId>', tempUserEmail: '<tempUserEmail>', hours: '<hours>' request temporary role usecase
    When try to request a temporary role
    Then It should send an approval email to the admin and return success message: '<result>'
    Examples:
      | email                    | tenantId     | userId                             | roleId | tempUserEmail             | hours | result                     |
      | user@example.com         | tenant123    | userId123                          | role1  | tempuser@example.com      | 24    | Temporary role requested   |

  Scenario Outline: It should throw an error for temporary role request
    Given email: '<email>', tenantId: '<tenantId>', userId: '<userId>', roleId: '<roleId>', tempUserEmail: '<tempUserEmail>', hours: '<hours>' request temporary role usecase
    When try to request a temporary role
    Then It should return the error: '<error>' for temporary role request
    Examples:
       | email                    | tenantId     | userId                             | roleId | tempUserEmail             | hours | error                                |
       | user@example.com         | tenant456    | userId123                          | role1  | tempuser@example.com      | 24    | Error: Admin not found for this tenant|
