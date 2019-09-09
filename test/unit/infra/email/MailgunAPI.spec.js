const { expect } = require('chai');
const sinon = require('sinon');
const request = require('request');
const MailgunAPI = require('src/infra/email/MailgunAPI');

describe('Infra :: MailgunAPI', () => {
  describe('send', () => {
    let postStub;

    let mailgunAPI;
    const config = { mailgun: {} };

    before(() => {
      postStub = sinon.stub(request, 'post');
      mailgunAPI = new MailgunAPI({ config });
    });

    after(() => {
      postStub.restore();
    });

    context('in the normal case', () => {
      let resp;
      before(async () => {
        postStub.callsFake((uri, options, cb) => {
          cb(null, { statusCode: 200 });
        });
        resp = await mailgunAPI.send({});
      });

      it('returns the correct message', () => {
        expect(resp).to.deep.equal({
          msg: 'Sent using Mailgun'
        });
      });

      it('calls request.post with the correct data', () => {
        expect(postStub.calledOnce).to.equal(true);
      });
    });

    context('when an error is returned', () => {
      before(() => {
        postStub.callsFake((uri, options, cb) => {
          cb(
            {
              statusCode: 400,
              body: JSON.stringify({ error: 'Error' })
            },
            null
          );
        });
      });

      it('it throws an error', async () => {
        await expect(mailgunAPI.send()).to.be.rejected();
      });
    });
  });
});
