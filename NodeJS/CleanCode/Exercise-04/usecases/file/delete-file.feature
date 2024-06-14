@file
Feature: Use case to delete files

  Scenario Outline: User should successfully delete a file
    Given fileId: '<fileId>', user: '<user>' delete file usecase
    When try to delete the file
    Then It should return the result: '<result>' after deletion
    Examples:
      | fileId                             | user                                                                           | result  |
      | 123                                | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true, "roleId": "1"}  | success |
      | 456                                | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": true, "roleId": "2"}  | success |

  Scenario Outline: It should throw error for deletion
    Given fileId: '<fileId>', user: '<user>' delete file usecase
    When try to delete the file
    Then It should return the error: '<error>' for deletion
    Examples:
      | fileId | user                                                                           | error                              |
      |        | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": false, "roleId": "1"} | 400: File ID is required           |
      | 123    | {"tenantId": "tenant1", "permissions": "1100", "isAdmin": false, "roleId": "1"} | 403: Insufficient permissions    |
      | 456    | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": false, "roleId": "2"} | 403: You do not have permission to delete this file    |
