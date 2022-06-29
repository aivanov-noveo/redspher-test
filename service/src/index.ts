import cors from 'cors';
import express, { json, NextFunction, Request, Response } from 'express';
import calculatorRouter from './calculatorRouter';

const PORT = process.env.PORT ?? 4000;

const app = express();

app.use(json());
app.use(cors());

app.use(calculatorRouter);

/**
 * Default error handler. Logs the occurred error to console and sends 500 HTTP error.
 * @returns 500 HTTP error 'Internal error'
 */
app.use((error: any, _: Request, res: Response, __: NextFunction) => {
  console.error(error);
  res.status(500).send('Internal error');
});

app.listen(PORT, () => {
  console.info(`Calculator service is now running at http://localhost:${PORT}`);
});
