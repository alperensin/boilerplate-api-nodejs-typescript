import { Router } from 'express';
import authMiddleware from '../../app/middlewares/authMiddleware';

const routerApiV1 = Router();

// Middleware authenticate user
routerApiV1.use(authMiddleware);

export default routerApiV1;