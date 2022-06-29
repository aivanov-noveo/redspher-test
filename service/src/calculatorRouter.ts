import { Request, Response, Router } from 'express';
import { hasOnlyValidCharacters } from './utils/validators';
import { parseAST } from './utils/parser';
import { calculate } from './utils/calculator';

interface CalculationResponse {
  error?: string;
  result?: string;
}

const router = Router();

/**
 * Parses and calculates an arithmetic expression and returns a result as a number.
 * Allowed characters: 0-9.+-*\/
 * Allowed numbers: integer and floating-point, positive, zero and negative
 * @example
 * Request body (JSON):
 * {
 *   "expression": "1.5 + 2*3 - 5/2"
 * }
 * Response (JSON):
 * {
 *   // an optional error message, is set when there was an error occurred while parsing or calculating a given expression
 *   "error": "<error message>",
 *   // an optional numeric result value, is set when there are no errors
 *   "result": 11.2
 * }
 */
router.post('/calc', (req: Request, res: Response<CalculationResponse>) => {
  const { expression } = req.body;

  if ((expression ?? '').trim() === '') {
    res.json({
      error: 'Expression cannot be empty',
    });

    return;
  }
  if (!hasOnlyValidCharacters(expression)) {
    res.json({
      error: 'Expression has invalid characters',
    });

    return;
  }
  const parseResult = parseAST(expression);

  if (parseResult.error !== undefined) {
    res.json({
      error: `Expression parsing error: ${parseResult.error}`,
    });

    return;
  }

  const calculationResult = calculate(parseResult);
  res.json({
    error: calculationResult.error,
    result: calculationResult.value?.toString(),
  });
});

export default router;
