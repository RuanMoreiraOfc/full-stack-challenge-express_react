import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import 'express-async-errors';

import { allRoutes } from '@routes/index';
import { AppError } from '@errors/AppError';

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(allRoutes);
app.use(
  (err: Error, _request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({ message: 'Internal server error' });
  },
);

app.listen(PORT, () => console.log(`Server opened at :::${PORT}`));
