export const CATEGORY_MESSAGES = {
    // Category related errors and success messages
    CATEGORY_EXISTS_ERROR: (name: string) => `The category "${name}" already exists. Please choose a different name.`,
    CATEGORY_CREATED_SUCCESS: (name: string) => `Category "${name}" has been successfully created.`,
};