class SendgridEmail {
  constructor({ config }) {
    this.from = { email: config.sendgrid.from };
  }

  merge(email) {
    this.personalizations = [
      {
        to: email.to.map(recipient => ({
          email: recipient
        })),
        ...(email.cc && {
          cc: email.cc.map(recipient => ({
            email: recipient
          }))
        }),
        ...(email.bcc && {
          bcc: email.bcc.map(recipient => ({
            email: recipient
          }))
        })
      }
    ];
    this.subject = email.subject;
    this.content = [{ type: 'text/plain', value: email.body }];
    return this;
  }
}

module.exports = SendgridEmail;
