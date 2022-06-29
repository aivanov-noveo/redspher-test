/**
 * Validates that an arithmetic expression string has the only allowed characters.
 * Allowed characters: 0-9.+-*\/
 * @param expression An arithmetic expression string.
 * @returns true if a given expression contains only allowed characters.
 */
export const hasOnlyValidCharacters = (expression: string): boolean =>
  new RegExp('^[ +-/*.0-9]+$', 'u').test(expression);
