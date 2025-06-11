export const AUTH_MESSAGES = {
    // Session related errors and messages
    SESSION_EXPIRED_ERROR: 'Your session has expired. Please log in again.',
    SESSION_VERIFICATION_FAILED_ERROR: 'Your session could not be verified. Please log in again.',

    // Authentication success messages
    REGISTRATION_COMPLETE_MESSAGE: 'Your registration is complete. You can now log in.',
    LOGOUT_SUCCESS_MESSAGE: 'You have successfully logged out.',

    // Login related errors
    LOGIN_NOT_FOUND: 'A user with the entered email address was not found. Please check your email address or register.',
    INVALID_PASSWORD_ERROR: 'The password you entered is incorrect. Please check your password and try again.', // Assuming this was meant to be included based on previous context

    // Validation errors during registration or profile update
    USERNAME_ALREADY_IN_USE: 'This username is already in use. Please choose another username.',
    EMAIL_ALREADY_REGISTERED: 'This email address is already registered. Please use a different email address.',

    // Token refresh errors
    REFRESH_TOKEN_MISSING: 'The information required to refresh your session was not found. Please log in again.',
    REFRESH_USER_NOT_FOUND: 'Your user account could not be verified. Please log in again.',
};