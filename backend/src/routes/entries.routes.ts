import { Router } from 'express';

import { ListWordsController } from '@controllers/entries/en';
import { ChangeFavoriteUserWordController } from '@controllers/entries/en/favorite';

export { routes as entriesRoutes };

const routes = Router();

routes.get('/en', (req, res) => ListWordsController.handle(req, res));
routes.post('/en/:word/favorite', (req, res) =>
  ChangeFavoriteUserWordController.handle(req, res),
);
routes.delete('/en/:word/unfavorite', (req, res) =>
  ChangeFavoriteUserWordController.handle(req, res),
);
