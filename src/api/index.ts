import express, { Response } from 'express';
import user from './user/user.routes';

const router = express.Router();

// Health Check
router.get('/health', (_, res: Response) => res.sendStatus(200));
// User Router
router.use('/user', user);

export default router;
