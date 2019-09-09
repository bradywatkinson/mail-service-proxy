const util = require('util');
const post = util.promisify(require('request').post);

class SendgridAPI {
  constructor({ config }) {
    this.url = config.sendgrid.url;
    this.apiToken = process.env.SENDGRID_API_TOKEN;
  }

  async send(email) {
    const resp = await post(`${this.url}/mail/send`, {
      body: JSON.stringify(email),
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    if (resp.statusCode !== 202) {
      const error = new Error('Bad response from Sendgrid API');
      error.errors = JSON.parse(resp.body).errors;
      throw error;
    }
    return { msg: 'Sent using Sendgrid' };
  }
}
module.exports = SendgridAPI;
