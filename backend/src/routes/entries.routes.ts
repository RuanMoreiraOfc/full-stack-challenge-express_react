import { Router } from 'express';

import { ListWordsController } from '@controllers/entries/en';
import { ViewUserWordController } from '@controllers/entries/en/word';
import { ChangeFavoriteUserWordController } from '@controllers/entries/en/favorite';

export { routes as entriesRoutes };

const routes = Router();

routes.get('/', (req, res) => ListWordsController.handle(req, res));
routes.get('/:word', (req, res) => ViewUserWordController.handle(req, res));
routes.post('/:word/favorite', (req, res) =>
  ChangeFavoriteUserWordController.handle(req, res),
);
routes.delete('/:word/unfavorite', (req, res) =>
  ChangeFavoriteUserWordController.handle(req, res),
);
