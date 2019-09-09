const path = require('path');
const logPath = path.join(__dirname, '../../logs/development.log');

module.exports = {
  web: {
    port: 3000
  },
  logging: {
    appenders: [{ type: 'console' }, { type: 'file', filename: logPath }]
  },
  mailgun: {
    url: 'https://api.mailgun.net/v3',
    domain: 'sandboxe144a526f4d445969e74a8c3879be3fa.mailgun.org'
  },
  sendgrid: {
    url: 'https://api.sendgrid.com/v3',
    from: 'sandbox@sendgrid.com'
  }
};
