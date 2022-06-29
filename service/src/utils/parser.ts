import { parse } from '@babel/parser';
import type { BinaryExpression, ExpressionStatement } from '@babel/types';

/**
 * A parsing result.
 * @field expression a parsed binary expression,
 * is present only if there is no parsing error, optional
 * @field error an occurred error message (if any),
 * is present only if there is a parsing error, optional
 */
export interface ParseResult {
  expression?: BinaryExpression;
  error?: string;
}

const EXPRESSION_STATEMENT = 'ExpressionStatement';
const BINARY_EXPRESSION = 'BinaryExpression';

/**
 * Parses an arithmetic expression string into AST.
 * The expression should contain at least one binary operation.
 * @example
 * 1.5 + 2*3 - 5/2 + +2 - -1
 * @param expression An arithmetic expression string.
 * @returns a parsing result with either AST contains numeric literal, unary operation
 * and binary operation nodes or a parsing error.
 * @example
 * ParseResult:
 * {
 *   // a parsed binary expression root node from AST, optional
 *   expression: BinaryExpression,
 *   // a parsing error (if any), optional
 *   error: string
 * }
 */
export const parseAST = (expression: string): ParseResult => {
  try {
    const ast = parse(expression);

    if (ast.errors.length > 0) {
      return {
        error: 'Unknown error',
      };
    }

    const statement = ast.program.body[0];

    if (statement.type !== EXPRESSION_STATEMENT) {
      return {
        error: 'Incorrect expression',
      };
    }

    const expressionStatement = statement as ExpressionStatement;

    if (expressionStatement.expression.type !== BINARY_EXPRESSION) {
      return {
        error: 'Incorrect expression',
      };
    }

    return {
      expression: expressionStatement.expression,
    };
  } catch (error: unknown) {
    console.error(error);

    return {
      error: 'Syntax error',
    };
  }
};
