@file
Feature: Use case to move files

  Scenario Outline: User should successfully move a file
    Given fileId: '<fileId>', newFolderId: '<newFolderId>', user: '<user>' move file usecase
    When try to move the file
    Then It should return the result: '<result>' after moving
    Examples:
      | fileId | newFolderId | user                                                                           | result  |
      | 123    | 456         | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true, "roleId": "1"}  | success |
      | 456    | 789         | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": true, "roleId": "2"}  | success |

  Scenario Outline: It should throw error for moving
    Given fileId: '<fileId>', newFolderId: '<newFolderId>', user: '<user>' move file usecase
    When try to move the file
    Then It should return the error: '<error>' for moving
    Examples:
      | fileId | newFolderId | user                                                                           | error                              |
      |        | 456         | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": false, "roleId": "1"} | 400: File ID and new folder ID are required |
      | 123    |             | {"tenantId": "tenant1", "permissions": "1100", "isAdmin": false, "roleId": "1"} | 400: File ID and new folder ID are required |
      | 456    | 789         | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": false, "roleId": "2"} | 403: Insufficient permissions      |
      | 789    | 123         | {"tenantId": "tenant3", "permissions": "1111", "isAdmin": false, "roleId": "3"} | 403: You do not have permission to move this file   |
