import { Router } from 'express';

import { SignUpController } from '@controllers/auth/signup';

export { routes as authRoutes };

const routes = Router();

routes.post('/signup', (req, res) => SignUpController.handle(req, res));
