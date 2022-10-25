import express, { Response } from 'express';

const router = express.Router();

// Health
router.get('/health', (_, res: Response) => res.sendStatus(200));

export default router;
