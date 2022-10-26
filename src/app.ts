import express from 'express';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import router from './api';
import deserializeUser from './middleware/deserializeUser';

// Initials
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: config.get<string>('corsOrigin'),
  })
);
app.use(helmet());

// Middleware
app.use(deserializeUser);

// Router
app.use('/api', router);

export default app;
