@folder
Feature: Use case to get all assigned folders

  Scenario Outline: User should successfully get all assigned folders
    Given user: '<user>' get all assigned folders usecase
    When try to get all assigned folders
    Then It should return the result: '<result>' after fetching all folder
    Examples:
      | user                                                                 | result                                    |
    #  | {"isAdmin": true, "roleId": "role1", "tenantId": "tenant1"}           | [{"folderId":1,"name":"Folder1"},{"folderId":2,"name":"Folder2"}]  |

  Scenario Outline: It should throw error for fetching without proper permissions or no assigned folders found
    Given user: '<user>' get all assigned folders usecase
    When try to get all assigned folders
    Then It should return the error: '<error>' for fetching all folder
    Examples:
      | user                                                                 | error                                                           |
      | {"isAdmin": false, "roleId": "", "tenantId": "tenant1"}              | 403: Insufficient permissions to view assigned folders for this role  |
      | {"isAdmin": false, "roleId": null, "tenantId": "tenant1"}            | 403: Insufficient permissions to view assigned folders for this role  |
      | {"isAdmin": true, "roleId": "role1", "tenantId": "tenant1"}           | 404: No assigned folders found for this role       |
      | {"isAdmin": false, "roleId": "role1", "tenantId": "tenant1"}          | 404: No assigned folders found for this role       |
