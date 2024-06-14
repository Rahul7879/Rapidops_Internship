@roleInvite
Feature: Use case to invite Roles

  Scenario Outline: Invite existing and new users
    Given email and roles: '<emailAndRoles>'
    And requester email: '<requesterEmail>'
    When try to invite role
    Then It should return a success message: '<message>'

    Examples:
      | emailAndRoles                                            | requesterEmail          | message                    |
      | [{"email":"existing_user@example.com","role_id":"role1"},{"email":"new_user@example.com","role_id":"role2"}] | requester@example.com | Invitations sent successfully |

  Scenario Outline: It should throw error for role invitation
    Given email and roles: '<emailAndRoles>'
    And requester email: '<requesterEmail>'
    When try to invite role
    Then It should return the error: '<error>'

    Examples:
      | emailAndRoles                                            | requesterEmail          | error                   |
      | [{"email":"non_existent_user@example.com","role_id":"role1"}] | requester@example.com | Requester not found     |
