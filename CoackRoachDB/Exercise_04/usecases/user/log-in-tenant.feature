Feature: Tenant-Specific User Login

  Scenario: Successful tenant-specific login
    Given a user with email "user@example.com" and userId "123"
    And a tenant with id "tenant1"
    When the user attempts to login to the tenant
    Then the tenant login should be successful with a token

  Scenario Outline: Tenant login failure
    Given a user with email "<email>" and userId "<userId>"
    And a tenant with id "<tenantId>"
    When the user attempts to login to the tenant
    Then the tenant login should fail with a <status> error and message "<message>"

    Examples:
      | email            | userId | tenantId | status | message                             |
      | user@example.com | 123    | tenant2  | 403    | User does not have access to this tenant |
