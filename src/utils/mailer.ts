import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';
import log from './logger';

const smtp = config.get<{
  host: string;
  secureConnection: boolean;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
  tls: {
    ciphers: string;
  };
}>('smtp');

const transporter = nodemailer.createTransport(smtp);

async function sendEmail(payload: SendMailOptions) {
  transporter.sendMail(payload, (err) => {
    if (err) {
      log.error(err, 'Error sending email');
      return;
    }
    log.info('Email has sent successfully');
  });
}

export default sendEmail;
