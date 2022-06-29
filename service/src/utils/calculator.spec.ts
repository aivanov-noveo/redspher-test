import { calculate } from './calculator';
import { parseAST } from './parser';

describe('calculate', () => {
  it('returns an error if an expression has an unknown unary operator', () => {
    expect.assertions(1);

    const result = calculate({
      expression: {
        type: 'BinaryExpression',
        operator: '+',
        left: {
          type: 'NumericLiteral',
          value: 1,
        },
        right: {
          type: 'UnaryExpression',
          operator: '!',
          prefix: true,
          argument: {
            type: 'NumericLiteral',
            value: 2,
          },
        },
      },
    });

    expect(result.error).toBe('Unknown operator in expression');
  });

  it('returns a division by zero error if an expression has division by zero', () => {
    expect.assertions(1);

    const result = calculate({
      expression: {
        type: 'BinaryExpression',
        operator: '/',
        left: {
          type: 'NumericLiteral',
          value: 1,
        },
        right: {
          type: 'NumericLiteral',
          value: 0,
        },
      },
    });

    expect(result.error).toBe('Division by zero');
  });

  it('returns an unknown operator error if an expression has an unknown binary operation operator', () => {
    expect.assertions(1);

    const result = calculate({
      expression: {
        type: 'BinaryExpression',
        operator: '**',
        left: {
          type: 'NumericLiteral',
          value: 1,
        },
        right: {
          type: 'NumericLiteral',
          value: 2,
        },
      },
    });

    expect(result.error).toBe('Unknown operator in expression');
  });

  it('returns an unknown expression element error if a parsed expression has an unknown expression element type', () => {
    expect.assertions(1);

    const result = calculate({
      expression: {
        type: 'ConditionalExpression' as 'BinaryExpression',
        operator: '**',
        left: {
          type: 'NumericLiteral',
          value: 1,
        },
        right: {
          type: 'NumericLiteral',
          value: 2,
        },
      },
    });

    expect(result.error).toBe('Unknown expression element');
  });

  it('throws an invalid argument error if a parsed result has undefined expression property', () => {
    expect.assertions(1);

    const calculateCaller = () => calculate({});

    expect(calculateCaller).toThrowError(
      'invalid argument "parseResult": "expression" property is undefined',
    );
  });

  it('return an infinity if an expression result is too big', () => {
    expect.assertions(1);

    const result = calculate({
      expression: {
        type: 'BinaryExpression',
        operator: '*',
        left: {
          type: 'NumericLiteral',
          value: 2,
        },
        right: {
          type: 'NumericLiteral',
          value: Number.MAX_VALUE,
        },
      },
    });

    expect(Number.isFinite(result.value)).toBe(false);
  });

  it('return a correct calculation result if a correct expression is passed', () => {
    expect.assertions(1);

    const parsedResult = parseAST('1+2*2-3/2 + +1 - -2');

    const result = calculate(parsedResult);

    expect(result.value).toBe(6.5);
  });
});
