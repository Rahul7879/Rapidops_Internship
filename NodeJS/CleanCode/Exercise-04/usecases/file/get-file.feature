@file
Feature: Use case to get file details
  Scenario Outline: User should successfully get file
    Given fileId: '<fileId>', user: '<user>' get file usecase
    When try to get file
    Then It should return the result: '<result>' after getting file
    Examples:
      | fileId | user                                                                                             | result                                                      |
      | 1    | {"tenantId":"tenant1","permissions":"10","isAdmin":false,"roleId":"role1"}                     | {"filePath":"path/to/file","fileDetails":{"file_path":"path/to/file"}}                        |
      | 2    | {"tenantId":"tenant2","permissions":"11","isAdmin":true,"roleId":"role2"}                      | {"filePath":"path/to/file2","fileDetails":{"file_path":"path/to/file2"}}                      |

  Scenario Outline: It should throw error for getting file
    Given fileId: '<fileId>', user: '<user>' get file usecase
    When try to get file
    Then It should return the error: '<error>' for getting file
    Examples:
      | fileId | user                                                                                             | error                                                                                         |
       |      | {"tenantId":"tenant1","permissions":"10","isAdmin":false,"roleId":"role1"}                     | {"msg":"File ID is required","status":400}                                                  |
      | 1    | {"tenantId":"tenant1","permissions":"00","isAdmin":false,"roleId":"role1"}                     | {"msg":"Insufficient permissions","status":403}                                             |
      | 3    | {"tenantId":"tenant1","permissions":"10","isAdmin":false,"roleId":"role1"}                     | {"msg":"File not found","status":404}                                                       |
      | 1    | {"tenantId":"tenant1","permissions":"10","isAdmin":false,"roleId":"role2"}                     | {"msg":"You do not have permission to access this file","status":403}                        |
