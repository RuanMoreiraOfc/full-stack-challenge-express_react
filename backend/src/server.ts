import type { Request, Response, NextFunction } from 'express';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import getEnv from '@utils/getEnv';

import { allRoutes } from '@routes/index';
import { AppError } from '@errors/AppError';

import populateDB from './populateDB';

const PORT = getEnv('PORT', 'number', 3333);

populateDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(allRoutes);
app.use(
  (err: Error, _request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      console.error(err.message);
      return response.status(err.statusCode).json({ message: err.message });
    }

    console.error(err.message);
    return response.status(500).json({ message: 'Internal server error' });
  },
);

app.listen(PORT, () => console.log(`Server opened at :::${PORT}`));
