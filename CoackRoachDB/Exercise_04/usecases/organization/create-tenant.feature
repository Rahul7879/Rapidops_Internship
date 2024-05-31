Feature: CreateTenant function

  Scenario: Successfully create a new organization for a user
    Given a valid email "test@example.com" and organization name "TestOrg"
    When createTenant is called with the email and organization name
    Then ensure fetchUserIdByEmail is called with the email
    And ensure checkExistingOrganization is called with the fetched userId
    And ensure createOrganization is called with the fetched userId and organization name
    And ensure setTenantForUser is called with the fetched userId and new organization id
    And ensure createAdminRole is called with the fetched userId and new organization id
    And the function returns the new organization id

  Scenario: User not found
    Given an invalid email "invalid@example.com" and organization name "InvalidOrg"
    When createTenant is called with the invalid email and organization name
    Then ensure fetchUserIdByEmail is called with the invalid email
    And the function throws an error with message "User not found" and status 404
