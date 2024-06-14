Feature: Create Tenant

  Scenario Outline: User should successfully create a tenant
    Given email: '<email>', orgName: '<orgName>' for create tenant usecase
    When try to create tenant
    Then It should return the organization ID: '<orgId>' after creating tenant
    Examples:
      | email                | orgName       | orgId                               |
      | user@example.com     | Example Corp  | org1 |

  Scenario Outline: It should throw an error for create tenant
    Given email: '<email>', orgName: '<orgName>' for create tenant usecase
    When try to create tenant
    Then It should return the error: '<error>' for creating tenant
    Examples:
      | email                | orgName       | error                                  |
      | invaliduser@nomail.com | New Org    | User not found (404)             |
      | user@example.com     | Existing Org | Organization already created for this user (409) |
