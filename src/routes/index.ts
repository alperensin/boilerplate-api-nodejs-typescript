import { Router } from 'express';
import routerApiV1 from './v1/api.routes';
import routerAuthV1 from './v1/auth.routes';

const router = Router();

// Api v1
router.use('/api/v1', routerApiV1);

// Auth v1
router.use('/auth/v1', routerAuthV1);

export default router;