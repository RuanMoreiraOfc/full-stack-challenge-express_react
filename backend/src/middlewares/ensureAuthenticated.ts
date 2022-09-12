import type { Request, Response, NextFunction } from 'express';

import verifyToken from '@utils/verifyToken';

export { ensureAuthenticatedMiddleware };

async function ensureAuthenticatedMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  await verifyToken(request);

  next();
}
