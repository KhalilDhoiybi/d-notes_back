import express, { Response } from 'express';
import user from './user/user.routes';
import auth from './auth/auth.routes';

const router = express.Router();

// Health Check
router.get('/health', (_, res: Response) => res.sendStatus(200));
// User Router
router.use('/user', user);
// Auth Router
router.use('/session', auth);

export default router;
