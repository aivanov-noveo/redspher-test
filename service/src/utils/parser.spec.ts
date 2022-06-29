import { parseAST } from './parser';
import * as parserModule from '@babel/parser';
import { Program } from '@babel/types';

describe('parseAST', () => {
  const parseSpy = jest.spyOn(parserModule, 'parse');
  const consoleErrorSpy = jest.spyOn(console, 'error');
  consoleErrorSpy.mockImplementation();

  it('passes an expression to the parse function', () => {
    expect.assertions(1);

    parseAST('1 + 2');

    expect(parseSpy).toHaveBeenCalledWith('1 + 2');
  });

  it('returns a syntax error if a parser throws SyntaxError', () => {
    expect.assertions(1);

    const result = parseAST('1 + 2..2');

    expect(result.error).toBe('Syntax error');
  });

  it('logs an error to console if a parser throws an error', () => {
    expect.assertions(1);

    parseSpy.mockImplementationOnce((): never => {
      throw new Error('Unknown error');
    });

    parseAST('1 + 2');

    expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Unknown error'));
  });

  it('returns an unknown error if a parser returns errors', () => {
    expect.assertions(1);

    parseSpy.mockReturnValueOnce({
      errors: [
        {
          code: 'some error code',
          reasonCode: 'reason code',
        },
      ],
      type: 'File',
      program: undefined as unknown as Program,
    });
    const result = parseAST('1 + 2..2');

    expect(result.error).toBe('Unknown error');
  });

  it('returns an incorrect expression error if a parser returns not an expression statement', () => {
    expect.assertions(1);

    parseSpy.mockReturnValueOnce({
      errors: [],
      type: 'File',
      program: {
        body: [
          {
            type: 'BlockStatement',
          },
        ],
      } as unknown as Program,
    });
    const result = parseAST('1 + 2');

    expect(result.error).toBe('Incorrect expression');
  });

  it('returns an incorrect expression error if a parser returns not a binary expression', () => {
    expect.assertions(1);

    parseSpy.mockReturnValueOnce({
      errors: [],
      type: 'File',
      program: {
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
            },
          },
        ],
      } as unknown as Program,
    });
    const result = parseAST('1 + 2');

    expect(result.error).toBe('Incorrect expression');
  });

  it('returns a parsed AST if a correct expression string is passed', () => {
    expect.assertions(1);

    const result = parseAST('1 + 2');

    expect(result.expression).toMatchSnapshot('parsed AST');
  });
});
