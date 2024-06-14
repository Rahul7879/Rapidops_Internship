@file
Feature: Use case to upload files

  Scenario Outline: User should successfully upload a file
    Given files: '<files>', body: '<body>', user: '<user>' upload file usecase
    When try to upload the files
    Then It should return the result: '<result>' after uploading
    Examples:
      | files                                   | body                                     | user                                                                           | result  |
      | {"file":[{"originalFilename":"test.txt","filepath":"/path/to/test.txt"}]} | {"formfolder": ["123"]} | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true}  | success |
      | {"file":[{"originalFilename":"test2.txt","filepath":"/path/to/test2.txt"}]} | {"formfolder": ["456"]} | {"tenantId": "tenant2", "permissions": "1110", "isAdmin": true}  | success |

  Scenario Outline: It should throw error for uploading
    Given files: '<files>', body: '<body>', user: '<user>' upload file usecase
    When try to upload the files
    Then It should return the error: '<error>' for uploading
    Examples:
      | files                                   | body                                     | user                                                                           | error                              |
    #  | {"file":[]}                             | {"formfolder": ["123"]} | {"tenantId": "tenant1", "permissions": "1111", "isAdmin": true} | 400: No file uploaded              |
      | {"file":[{"originalFilename":"test.txt","filepath":"/path/to/test.txt"}]} | {"formfolder": []}        | {"tenantId": "tenant1", "permissions": "1100", "isAdmin": false} | 400: Folder ID is required        |
      | {"file":[{"originalFilename":"test.txt","filepath":"/path/to/test.txt"}]} | {"formfolder": ["789"]} | {"tenantId": "tenant2", "permissions": "0000", "isAdmin": false} | 403: Insufficient permissions    |
