@roletjjj
Feature: Request Temporary Role

  Scenario Outline: Successfully send role approval request email to tenant admin
    Given the admin email for tenant with ID "<tenantId>" is "<adminEmail>"
    When the user with email "<email>" requests to assign temporary role with ID "<roleId>" to "<tempUserEmail>" for hours
    Then an email should be sent to "<adminEmail>" with an approval link

    Examples:
      | tenantId | adminEmail               | email                | roleId | tempUserEmail       | hours |
    
      | tenant1  | admin1@example.com       | user1@example.com    | role1  | tempuser1@example.com | 4     |
    #  | tenant2  | admin2@example.com       | user2@example.com    | role2  | tempuser2@example.com | 6     |

  Scenario Outline: Throw error when admin email is not found
    Given the admin email for tenant with ID "<tenantId>" is not found
    When the user with email "<email>" requests to assign temporary role with ID "<roleId>" to "<tempUserEmail>" for "<hours>" hours
    Then it should return the error "Admin not found for this tenant"

    Examples:
    #  | tenantId | email                   | roleId | tempUserEmail       | hours |
    #  | tenant1  | user1@example.com       | role1  | tempuser1@example.com | 4     |
    #  | tenant2  | user2@example.com       | role2  | tempuser2@example.com | 6     |

