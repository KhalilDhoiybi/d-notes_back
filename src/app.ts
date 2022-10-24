import express, { Response } from 'express';
import config from 'config';
import sendEmail from './utils/mailer';

const app = express();
app.use(express.json());

app.get('/healthcheck', (_, res: Response) => {
  res.sendStatus(200);
});

app.get('/mailertest', async (_, res: Response) => {
  try {
    await sendEmail({
      from: config.get('smtp.auth.user'),
      to: 'khalildoiybi31@gmail.com',
      subject: 'MailerTest',
      text: `Your mailer is working perfectly`,
      html: `
      <h1>Mailer</h1>
      <p>This is your email</p>
    `,
    });
    return res.sendStatus(200);
  } catch (e) {
    return res.sendStatus(400);
  }
});

export default app;
