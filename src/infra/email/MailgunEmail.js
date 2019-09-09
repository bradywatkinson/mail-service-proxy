class MailgunEmail {
  constructor({ config }) {
    this.from = `Mailgun Sandbox <postmaster@${config.mailgun.domain}>`;
  }

  merge(email) {
    this.to = email.to.join(', ');
    this.cc = email.cc ? email.cc.join(', ') : undefined;
    this.bcc = email.bcc ? email.bcc.join(', ') : undefined;
    this.subject = email.subject;
    this.text = email.body;
    return this;
  }
}

module.exports = MailgunEmail;
