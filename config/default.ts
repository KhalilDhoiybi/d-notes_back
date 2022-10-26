export default {
  port: 3000,
  dbUri: 'mongodb://localhost:27017/d-notes',
  corsOrigin: 'http://localhost',
  logLevel: 'info',
  accessTokenPrivateKey: 'changeme',
  refreshTokenPrivateKey: 'changeme',
  accessTokenPublicKey: 'changeme',
  refreshTokenPublicKey: 'changeme',
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
