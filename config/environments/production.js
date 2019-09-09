module.exports = {
  web: {
    port: process.env.PORT
  },
  logging: {
    appenders: [{ type: 'console', layout: { type: 'basic' } }]
  },
  mailgun: {
    url: 'https://api.mailgun.net/v3',
    domain: 'sandboxe144a526f4d445969e74a8c3879be3fa.mailgun.org',
    apiToken: 'f90f3e932d6d001ea9a9a729383b8e4e-4167c382-922f00cf'
  },
  sendgrid: {
    url: 'https://api.sendgrid.com/v3',
    apiToken:
      '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',
    from: 'sandbox@sendgrid.com'
  }
};
