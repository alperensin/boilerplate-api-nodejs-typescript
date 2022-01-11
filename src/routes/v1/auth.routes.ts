import { Router } from 'express';

import AuthController from '../../app/controllers/AuthController';
import UserController from '../../app/controllers/UserController';

const routerAuthV1 = Router();

// User authenticate
routerAuthV1.post('/authenticate', AuthController.authenticate);

// Create user
routerAuthV1.post('/users', UserController.store);

export default routerAuthV1;