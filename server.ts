import dotenv from 'dotenv';
dotenv.config();
import config from 'config';
import app from './src/app';
import connect from './src/utils/db';
import log from './src/utils/logger';

// Starting The Server..
const port = config.get<number>('port');
app.listen(port, async () => {
  log.info(`Server is running on port http://localhost:${port}`);
  await connect();
});
