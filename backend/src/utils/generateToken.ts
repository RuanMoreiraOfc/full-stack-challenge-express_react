import type { SignOptions } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';

export default generateToken;

function generateToken(options: SignOptions) {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (JWT_SECRET === undefined) {
    throw new AppError({
      statusCode: 503,
      message: 'Internal misconfiguration',
    });
  }

  return sign({}, JWT_SECRET, { expiresIn: '1d', ...options });
}
