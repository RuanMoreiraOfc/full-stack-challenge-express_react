import type { Request } from 'express';
import type { SignOptions } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

import getEnv from '@utils/getEnv';

import { AppError } from '@errors/AppError';

export default getUserIdFromToken;

function getUserIdFromToken(request: Request, options?: SignOptions) {
  const [, headerToken] = request.headers['authorization']?.split(' ') || [];

  const JWT_SECRET = getEnv('JWT_SECRET', 'string');

  try {
    const { sub: user_id } = verify(headerToken, JWT_SECRET, options) as {
      sub: string;
    };

    return user_id;
  } catch (err) {
    throw new AppError({ message: 'Invalid token!', statusCode: 401 });
  }
}
