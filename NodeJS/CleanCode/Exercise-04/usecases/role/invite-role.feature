Feature: Invite Role Use Case

  Scenario Outline: Successfully invite roles
    Given data with emailAndRole: '<emailAndRole>' and user email: '<userEmail>'
    When try to invite roles
    Then It should send emails to the specified users
    Examples:
      | emailAndRole                                      | userEmail           |
      | [{"email": "user1@example.com", "role_id": "1"}]  | admin@example.com   |
      | [{"email": "user2@example.com", "role_id": "2"}]  | admin@example.com   |

  Scenario Outline: Requester not found
    Given data with emailAndRole: '<emailAndRole>' and user email: '<userEmail>'
    When try to invite roles
    Then It should return the error: '<error>'
    Examples:
      | emailAndRole                                     | userEmail           | error                           |
      | [{"email": "user3@example.com", "role_id": "3"}] | unknown@example.com | Requester not found (404)       |
