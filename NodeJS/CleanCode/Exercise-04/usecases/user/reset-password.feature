# Feature: Reset Password

#   Background:
#     Given a valid JWT SECRET_KEY

#   Scenario Outline: Successfully reset password
#     Given a valid token "<token>" and new password "<newPassword>"
#     When resetPassword function is called
#     Then it should return status 200 and message "Password reset successful"

#     Examples:
#       | token       | newPassword |
#       | valid_token | new_password |

#   Scenario Outline: Invalid or expired token
#     Given an invalid token "<token>" and new password "<newPassword>"
#     When resetPassword function is called
#     Then it should throw an error with status 400 and message "Invalid or expired token"

#     Examples:
#       | token        | newPassword |
#       | invalid_token| new_password |
