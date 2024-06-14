Feature: Tenant-Specific User Login

  Scenario Outline: Successful tenant-specific login
    Given a user with email "<email>" and userId "<userId>"
    And a tenant with id "<tenantId>"
    When the user attempts to login to the tenant
    Then the tenant login should be successful with a token

    Examples:
      | email           | userId | tenantId |
      | user1@example.com | 123    | tenant1  |
      | user2@example.com | 456    | tenant1  |
      | user3@example.com | 789    | tenant1  |

  Scenario Outline: Tenant login failure
    Given a user with email "<email>" and userId "<userId>"
    And a tenant with id "<tenantId>"
    When the user attempts to login to the tenant
    Then the tenant login should fail with a <status> error and message "<message>"

    Examples:
      | email            | userId | tenantId | status | message                                     |
      | user@example.com | 123    | tenant2  | 403    | User does not have access to this tenant    |
