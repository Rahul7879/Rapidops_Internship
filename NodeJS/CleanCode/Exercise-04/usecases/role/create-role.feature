@role
Feature: Use case to create Roles

  Scenario Outline: User should successfully create a role
    Given roleName: '<roleName>', isReadable: '<isReadable>', isDeletable: '<isDeletable>', isWritable: '<isWritable>', isEditable: '<isEditable>' role creation usecase
    And user email: '<userEmail>'
    When try to create role
    Then It should return a success message: '<message>' after role creation

    Examples:
      | roleName | isReadable | isDeletable | isWritable | isEditable | userEmail         | message                    |
      | Admin    | true       | true        | true       | true       | admin@example.com | Role created successfully  |
      | Editor   | true       | false       | true       | true       | editor@example.com| Role created successfully  |

  Scenario Outline: It should throw error for role creation
    Given roleName: '<roleName>', isReadable: '<isReadable>', isDeletable: '<isDeletable>', isWritable: '<isWritable>', isEditable: '<isEditable>' role creation usecase
    And user email: '<userEmail>'
    When try to create role
    Then It should return the error: '<error>' for role creation

    Examples:
      | roleName    | isReadable | isDeletable | isWritable | isEditable | userEmail              | error                                                    |
      | Admin       | true       | true        | true       | true       | noTenant@example.com   | NotFoundError: No tenant ID found for user                              |
      | duplicateRole      | true       | false       | true       | true       | duplicate@example.com  | ConFlictError: Role already exists in tenant tenantId                   |
      | Viewer      |            | true        | false      | true       | viewer@example.com     | ValidationError: "isReadable" is required                |
      | Contributor | true       |             | false      | true       | contributor@example.com| ValidationError: "isDeletable" is required               |
      | Admin       | true       | true        |            | true       | admin@example.com      | ValidationError: "isWritable" is required                |
      | Editor1      | true       | true        | false      |            | editor@example.com     | ValidationError: "isEditable" is required                |
