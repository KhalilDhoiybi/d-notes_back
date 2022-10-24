export default {
  port: 3000,
  dbUri: 'mongodb://localhost:27017/d-notes',
  logLevel: 'info',
  accessTokenPrivateKey: '',
  refreshTokenPrivateKey: '',
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
