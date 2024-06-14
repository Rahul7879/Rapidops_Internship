Feature: Create Tenant

  Scenario Outline: Successful tenant creation
    Given a valid email "<email>" and organization name "<orgName>"
    When createTenant is called with the email and organization name
    Then ensure fetchUserIdByEmail is called with the email
    And ensure checkExistingOrganization is called with the fetched userId
    And ensure createOrganization is called with the fetched userId and organization name
    And ensure setTenantForUser is called with the fetched userId and new organization id
    And ensure createAdminRole is called with the fetched userId and new organization id
    And the function returns the new organization id

    Examples:
      | email              | orgName     |
      | user1@example.com  | Org1        |
      | user2@example.com  | Org2        |
      | user3@example.com  | Org3        |

  Scenario Outline: Tenant creation failure
    Given a valid email "<email>" and organization name "<orgName>"
    When createTenant is called with the email and organization name
    Then the function throws an error with message "<msg>" and status <status>

    Examples:
      | email                   | orgName      | msg                                           | status |
      | nonexisting@example.com | TestOrg      | User not found                                 | 404    |
      | user@example.com        | DuplicateOrg | Organization already created for this user      | 409    |
