@folder
Feature: Get folder contents

  Scenario Outline: Successfully get folder contents
    Given folderId: '<folderId>', user: '<user>', page: '<page>', pageSize: '<pageSize>'
    When try to get folder contents
    Then It should return folders: '<folders>', files: '<files>', totalItems: '<totalItems>', totalPages: '<totalPages>', currentPage: '<currentPage>', pageSize: '<pageSize>'
    Examples:
      | folderId | user                                                                            | page | pageSize | folders     | files       | totalItems | totalPages | currentPage | pageSize |
      | 1        | {"tenantId": "tenant1", "permissions": "1", "isAdmin": true, "roleId": "role1"} | 1    | 10       | [{"id": 1}] | [{"id": 1}] | 2          | 1          | 1           | 10       |

  Scenario Outline: Missing folder ID
    Given folderId: '<folderId>', user: '<user>', page: '<page>', pageSize: '<pageSize>'
    When try to get folder contents
    Then It should throw an error with message: '<error>'
    Examples:
      | folderId | user                                                                            | page | pageSize | error                 |
      |          | {"tenantId": "tenant1", "permissions": "1", "isAdmin": true, "roleId": "role1"} | 1    | 10       | Folder ID is required |
