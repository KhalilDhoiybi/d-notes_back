import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

async function connect() {
  const dbUri = config.get<string>('dbUri');

  try {
    await mongoose.connect(dbUri);
    log.info('Successfully connected to database');
  } catch (e) {
    log.error('Fail to connect to database');
    process.exit(1);
  }
}

export default connect;
