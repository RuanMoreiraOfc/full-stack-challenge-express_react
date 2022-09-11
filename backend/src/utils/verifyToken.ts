import type { Request } from 'express';
import type { SignOptions } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

import { AppError } from '@errors/AppError';

export default verifyToken;

function verifyToken(request: Request, options?: SignOptions) {
  const [, headerToken] = request.headers['authorization']?.split(' ') || [];

  const JWT_SECRET = process.env.JWT_SECRET;

  if (JWT_SECRET === undefined) {
    throw new AppError({
      statusCode: 503,
      message: 'Internal misconfiguration',
    });
  }

  try {
    const { sub } = verify(headerToken, JWT_SECRET, options) as { sub: string };
    return sub;
  } catch (err) {
    throw new AppError({ message: 'Invalid token!', statusCode: 401 });
  }
}
