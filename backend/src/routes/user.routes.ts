import { Router } from 'express';

import { ListFavoriteUsersWordsController } from '@controllers/user/me/favorites';

export { routes as userRoutes };

const routes = Router();

routes.get('/favorites', (req, res) =>
  ListFavoriteUsersWordsController.handle(req, res),
);
