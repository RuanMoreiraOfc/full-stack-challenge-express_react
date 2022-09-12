import swaggerDocument from '@public/swagger.json';

import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { ensureAuthenticatedMiddleware } from '@middlewares/ensureAuthenticated';

import { authRoutes } from '@routes/auth.routes';
import { entriesRoutes } from '@routes/entries.routes';
import { userRoutes } from '@routes/user.routes';

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
routes.use('/entries/en', ensureAuthenticatedMiddleware);
routes.use('/entries/en', entriesRoutes);
routes.use('/user/me', ensureAuthenticatedMiddleware);
routes.use('/user/me', userRoutes);
