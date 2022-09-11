import { Router } from 'express';

import { authRoutes } from '@routes/auth.routes';

export { routes as allRoutes };

const routes = Router();
routes.use('/auth', authRoutes);
