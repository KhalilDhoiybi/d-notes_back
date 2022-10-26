export default {
  port: 3000,
  dbUri: 'mongodb://localhost:27017/d-notes',
  corsOrigin: 'http://localhost',
  domain: 'localhost',
  logLevel: 'info',
  accessTokenPrivateKey: '',
  refreshTokenPrivateKey: '',
  accessTokenPublicKey: '',
  refreshTokenPublicKey: '',
  //   Outlook Smtp config
  smtp: {
    host: 'smtp-mail.outlook.com',
    secureConnection: false,
    port: 587,
    auth: {
      user: '',
      pass: '',
    },
    tls: {
      ciphers: 'SSLv3',
    },
  },
};
