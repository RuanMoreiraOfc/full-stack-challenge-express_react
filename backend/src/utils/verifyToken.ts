import type { Request } from 'express';
import type { SignOptions } from 'jsonwebtoken';
import { verify, TokenExpiredError } from 'jsonwebtoken';

import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';
import getEnv from '@utils/getEnv';

import { AppError } from '@errors/AppError';

export default verifyToken;

const prisma = PrismaClientSingleton.getInstance().client;

async function verifyToken(request: Request, options?: SignOptions) {
  const [, headerToken] = request.headers['authorization']?.split(' ') || [];

  const JWT_SECRET = getEnv('JWT_SECRET', 'string');

  try {
    const { sub: user_id } = verify(headerToken, JWT_SECRET, options) as {
      sub: string;
      exp: number;
    };

    await prisma.jwt.findFirstOrThrow({
      where: {
        value: headerToken,
      },
    });

    return user_id;
  } catch (err) {
    expiration_verify: {
      if (err instanceof TokenExpiredError) {
        try {
          await prisma.jwt.delete({
            where: {
              value: headerToken,
            },
          });
        } catch {
          break expiration_verify;
        }

        throw new AppError({ message: 'Expired token!', statusCode: 401 });
      }
    }

    throw new AppError({ message: 'Invalid token!', statusCode: 401 });
  }
}
