import type { Request } from 'express';
import type { SignOptions } from 'jsonwebtoken';
import { verify } from 'jsonwebtoken';

import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';
import getEnv from '@utils/getEnv';

import { AppError } from '@errors/AppError';

export default verifyToken;

const prisma = PrismaClientSingleton.getInstance().client;

async function verifyToken(request: Request, options?: SignOptions) {
  const [, headerToken] = request.headers['authorization']?.split(' ') || [];

  const JWT_SECRET = getEnv('JWT_SECRET', 'string');

  try {
    const { sub: user_id, exp } = verify(headerToken, JWT_SECRET, options) as {
      sub: string;
      exp: number;
    };

    const jwtFromDb = await prisma.jwt.findFirst({
      where: {
        value: headerToken,
      },
    });

    if (!jwtFromDb) {
      throw new Error('skip to catch');
    }

    const createdTimestamp = jwtFromDb.created_at.valueOf() + exp;
    const dateDifference = createdTimestamp - Date.now();

    if (dateDifference <= 0) {
      await prisma.jwt.delete({
        where: {
          user_id,
        },
      });

      throw new AppError({ message: 'Expired token!', statusCode: 401 });
    }

    return user_id;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError({ message: 'Invalid token!', statusCode: 401 });
  }
}
