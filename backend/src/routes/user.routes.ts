import { Router } from 'express';

import { ListViewedUsersWordsController } from '@controllers/user/me/history';
import { ListFavoriteUsersWordsController } from '@controllers/user/me/favorites';

export { routes as userRoutes };

const routes = Router();

routes.get('/history', (req, res) =>
  ListViewedUsersWordsController.handle(req, res),
);
routes.get('/favorites', (req, res) =>
  ListFavoriteUsersWordsController.handle(req, res),
);
