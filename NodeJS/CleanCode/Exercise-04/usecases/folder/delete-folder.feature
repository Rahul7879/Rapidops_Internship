@folder
Feature: Use case to delete folders

  Scenario Outline: User should successfully delete a folder
    Given folderId: '<folderId>', user: '<user>' delete folder usecase
    When try to delete the folder
    Then It should return the result: '<result>' after deleting
    Examples:
      | folderId | user                                                                 | result  |
      | 123      | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true}      | success |
      | 456      | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": true}      | success |

  Scenario Outline: It should throw error for deleting
    Given folderId: '<folderId>', user: '<user>' delete folder usecase
    When try to delete the folder
    Then It should return the error: '<error>' for deleting
    Examples:
      | folderId | user                                                                 | error                                |
      |          | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true}      | 400: Folder ID is required           |
      | 123      | {"tenantId": "tenant1", "permissions": "1100", "isAdmin": false}     | 403: Insufficient permissions        |
      | 456      | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": false}     | 403: You do not have permission to delete this folder     |
