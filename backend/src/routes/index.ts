import swaggerDocument from '@public/swagger.json';

import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { authRoutes } from '@routes/auth.routes';

export { routes as allRoutes };

const routes = Router();

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.use('/auth', authRoutes);
