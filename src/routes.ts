import { Router } from 'express';

import authMiddleware from './app/middlewares/authMiddleware';

import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

const router = Router();

// User authenticate
router.post('/authenticate', AuthController.authenticate);

// Create user
router.post('/users', UserController.store);

// Middleware authenticate user
router.use(authMiddleware);

export default router;