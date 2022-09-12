import type { Request, Response, NextFunction } from 'express';

import { PrismaClientSingleton } from '@utils/PrismaClientSingleton';
import verifyToken from '@utils/verifyToken';

import { AppError } from '@errors/AppError';

export { ensureAuthenticatedMiddleware };

const prisma = PrismaClientSingleton.getInstance().client;

async function ensureAuthenticatedMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const id = await verifyToken(request);

  const user = prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) {
    throw new AppError({ message: 'Invalid token!', statusCode: 401 });
  }

  next();
}
