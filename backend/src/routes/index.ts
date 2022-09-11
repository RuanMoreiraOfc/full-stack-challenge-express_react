import swaggerDocument from '@public/swagger.json';

import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { authRoutes } from '@routes/auth.routes';
import { entriesRoutes } from '@routes/entries.routes';

export { routes as allRoutes };

const routes = Router();

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/', (req, res) => {
  return res.json({
    message: 'Fullstack Challenge 🏅 - Dictionary',
  });
});

routes.use('/auth', authRoutes);
routes.use('/entries', entriesRoutes);
