import {
  NumericLiteral,
  BinaryExpression,
  UnaryExpression,
} from '@babel/types';
import { ParseResult } from './parser';

type AllowedNode = NumericLiteral | BinaryExpression | UnaryExpression;

enum AllowedOperators {
  plus = '+',
  minus = '-',
  multiplication = '*',
  division = '/',
}

/**
 * A calculation result.
 * @field value a calculated value, is present only
 * if there is no parsing or calculation error, optional
 * @field error an occurred error message (if any), is present only
 * if there is a parsing or a calculation error, optional
 */
export interface CalculationResult {
  value?: number;
  error?: string;
}

/**
 * Returns a numeric literal node value
 * @param node a numeric literal node that represents a single numeric value
 * @returns a numeric value from a node
 */
const calculateNumericNode = (node: NumericLiteral): number => {
  return node.value;
};

/**
 * Calculates a value for a unary expression node.
 * Allowed operators: +-
 * @param node a unary expression node that represents one of unary operations:
 * a minus or a plus
 * @returns a calculated value: either a negative one if an operator is a minus
 * or a value itself if an operator is a plus
 * @throws throws an error if a passed node has not allowed operator.
 */
const calculateUnaryNode = (node: UnaryExpression): number => {
  switch (node.operator) {
    case AllowedOperators.plus:
      return calculateNode(node.argument as AllowedNode);
    case AllowedOperators.minus:
      return -calculateNode(node.argument as AllowedNode);
    default:
      throw new Error('Unknown operator in expression');
  }
};

/**
 * Calculates a value for a binary expression node.
 *
 * Allowed operators: +-*\/
 *
 * Allowed left and right nodes: a unary operation, a numeric literal or a binary operation.
 * @param node a binary expression node that represents one of binary operations:
 * an addition, a subtraction, a division or a multiplication.
 * @returns a calculated binary expression value
 * @throws throws a division by zero error if a passed node with a division operator
 * has the zero value in the right expression.
 * @throws throws an unknown operator error if a passed node has not allowed operator.
 */
const calculateBinaryNode = (node: BinaryExpression): number => {
  const leftExpression = node.left as AllowedNode;
  const rightExpression = node.right as AllowedNode;
  const leftExpressionValue = calculateNode(leftExpression);
  const rightExpressionValue = calculateNode(rightExpression);

  switch (node.operator) {
    case AllowedOperators.plus:
      return leftExpressionValue + rightExpressionValue;
    case AllowedOperators.minus:
      return leftExpressionValue - rightExpressionValue;
    case AllowedOperators.multiplication:
      return leftExpressionValue * rightExpressionValue;
    case AllowedOperators.division:
      if (rightExpressionValue === 0) {
        throw new Error('Division by zero');
      }

      return leftExpressionValue / rightExpressionValue;
    default:
      throw new Error('Unknown operator in expression');
  }
};

/**
 * Calculates a value for an expression node.
 * Allowed node types: a unary operation, a numeric literal or a binary operation.
 * @param node an expression node that can be: a unary operation, a numeric literal or a binary operation.
 * @returns a calculated expression value
 * @throws throws an unknown expression element error if a passed node has not allowed node type.
 */
const calculateNode = (node: AllowedNode): number => {
  switch (node.type) {
    case 'NumericLiteral':
      return calculateNumericNode(node);
    case 'BinaryExpression':
      return calculateBinaryNode(node);
    case 'UnaryExpression':
      return calculateUnaryNode(node);
    default:
      throw new Error('Unknown expression element');
  }
};

/**
 * Calculates a value for an arithmetic expression passed as a parsed AST
 * from @babel/parser.
 *
 * Allowed operators: +-*\/
 *
 * Allowed numbers: integer and floating-point, positive, zero and negative.
 * @param parseResult a parsed AST result that contains an arithmetic expression as a string.
 * @returns a calculated expression value.
 * @throws throws an invalid argument expression error
 * if a passed result has no `expression` property or its values is undefined.
 */
export const calculate = (parseResult: ParseResult): CalculationResult => {
  const expression = parseResult.expression;

  if (expression === undefined) {
    throw new Error(
      'invalid argument "parseResult": "expression" property is undefined',
    );
  }

  try {
    const result = calculateNode(expression);

    return {
      value: result,
    };
  } catch (error: unknown) {
    return {
      error: (error as Error).message,
    };
  }
};
