const util = require('util');
const request = require('request');

class MailgunAPI {
  constructor({ config }) {
    this.url = config.mailgun.url;
    this.domain = config.mailgun.domain;
    this.apiToken = process.env.MAILGUN_API_TOKEN;
    this.post = util.promisify(request.post);
  }

  async send(email) {
    const resp = await this.post(`${this.url}/${this.domain}/messages`, {
      form: email,
      auth: {
        user: 'api',
        password: this.apiToken
      }
    });
    if (resp.statusCode !== 200) {
      const error = new Error('Bad response from Mailgun API');
      error.errors = [JSON.parse(resp.body)];
      throw error;
    }
    return { msg: 'Sent using Mailgun' };
  }
}

module.exports = MailgunAPI;
