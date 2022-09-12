import type { SignOptions } from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';

import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';

import { AppError } from '@errors/AppError';

export default generateToken;

type SignOptionsFiltered = SignOptions & {
  subject: string;
};

const prisma = PrismaClientSingleton.getInstance().client;

async function generateToken(options: SignOptionsFiltered) {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (JWT_SECRET === undefined) {
    throw new AppError({
      statusCode: 503,
      message: 'Internal misconfiguration',
    });
  }

  const jwt = sign({}, JWT_SECRET, {
    expiresIn: '1d',
    ...options,
  });

  const user_id = options.subject;

  await prisma.jwt.upsert({
    where: {
      user_id,
    },
    create: {
      user_id,
      value: jwt,
    },
    update: {
      value: jwt,
      created_at: new Date(),
    },
  });

  return jwt;
}
