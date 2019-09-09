const Operation = require('src/app/Operation');
const emailSchema = require('./email.schema.json');

class SendEmail extends Operation {
  constructor({
    jsonValidator,
    mailgunEmail,
    mailgunAPI,
    sendgridEmail,
    sendgridAPI
  }) {
    super();
    this.validateEmail = jsonValidator.compile(emailSchema);
    this.mailgunEmail = mailgunEmail;
    this.mailgunAPI = mailgunAPI;
    this.sendgridEmail = sendgridEmail;
    this.sendgridAPI = sendgridAPI;
  }

  async execute(email, { provider }) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    try {
      const valid = this.validateEmail(email);

      if (!valid) {
        return this.emit(VALIDATION_ERROR, this.validateEmail.errors);
      }

      let resp;
      if (provider === 'mailgun') {
        resp = await this.mailgunAPI.send(this.mailgunEmail.merge(email));
      } else if (provider === 'sendgrid') {
        resp = await this.sendgridAPI.send(this.sendgridEmail.merge(email));
      } else {
        try {
          resp = await this.sendgridAPI.send(this.mailgunEmail.merge(email));
        } catch (e) {
          await this.sendgridAPI.send(this.sendgridEmail.merge(email));
        }
      }

      this.emit(SUCCESS, resp);
    } catch (error) {
      this.emit(ERROR, error);
    }
  }
}

SendEmail.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = SendEmail;
