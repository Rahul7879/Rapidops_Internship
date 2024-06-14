@folder
Feature: Use case to move folders

  Scenario Outline: User should successfully move a folder
    Given folderId: '<folderId>', newParentFolder: '<newParentFolder>', user: '<user>' move folder usecase
    When try to move the folder
    Then It should return the result: '<result>' after moving
    Examples:
      | folderId | newParentFolder | user                                                                 | result  |
      | 123      | 456             | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true}      | success |
      | 789      | 101             | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": true}      | success |

  Scenario Outline: It should throw error for moving
    Given folderId: '<folderId>', newParentFolder: '<newParentFolder>', user: '<user>' move folder usecase
    When try to move the folder
    Then It should return the error: '<error>' for moving
    Examples:
      | folderId | newParentFolder | user                                                                 | error                                     |
      |          | 456             | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true}      | 400: Folder ID and new parent folder ID are required  |
      | 123      |                 | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true}      | 400: Folder ID and new parent folder ID are required  |
      | 123      | 456             | {"tenantId": "tenant1", "permissions": "1100", "isAdmin": false}     | 403: Insufficient permissions             |
      | 789      | 101             | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": false}     | 403: Insufficient permissions           |
