import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './api';

// Initials
const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

// Router
app.use('/api', router);

export default app;
