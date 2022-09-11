import { Router } from 'express';

import { SignUpController } from '@controllers/auth/signup';
import { SignInController } from '@controllers/auth/signin';

export { routes as authRoutes };

const routes = Router();

routes.post('/signup', (req, res) => SignUpController.handle(req, res));
routes.post('/signin', (req, res) => SignInController.handle(req, res));
