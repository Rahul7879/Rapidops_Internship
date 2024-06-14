@folder
Feature: Use case to assign folders to roles

  Scenario Outline: Admin should successfully assign folders to role
    Given folders: '<folders>', roleId: '<roleId>', user: '<user>' assign folders to role usecase
    When try to assign folders to role
    Then It should return the result: '<result>' after assigning
    Examples:
      | folders      | roleId | user                                                                 | result  |
      | [1,2,3]      | role1  | {"isAdmin": true, "tenantId": "tenant1"}                             | success |
      | [4,5,6]      | role2  | {"isAdmin": true, "tenantId": "tenant2"}                             | success |

  Scenario Outline: Non-admin user should not assign folders to role
    Given folders: '<folders>', roleId: '<roleId>', user: '<user>' assign folders to role usecase
    When try to assign folders to role
    Then It should return the error: '<error>' for assigning
    Examples:
      | folders      | roleId | user                                                                 | error                                                        |
      | [1,2,3]      | role1  | {"isAdmin": false, "tenantId": "tenant1"}                            | 403: Insufficient permissions to assign folders to roles     |
      | [4,5,6]      | role2  | {"isAdmin": false, "tenantId": "tenant2"}                            | 403: Insufficient permissions to assign folders to roles     |
