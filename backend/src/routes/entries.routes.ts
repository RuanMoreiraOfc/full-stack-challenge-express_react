import { Router } from 'express';

import { ListWordsController } from '@controllers/entries/en';

export { routes as entriesRoutes };

const routes = Router();

routes.get('/en', (req, res) => ListWordsController.handle(req, res));
