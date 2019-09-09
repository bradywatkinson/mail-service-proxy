const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const EmailController = {
  get router() {
    const router = Router();

    router.post('/send', inject('sendEmail'), this.index);

    return router;
  },

  index(req, res, next) {
    const { sendEmail } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = sendEmail.outputs;

    sendEmail
      .on(SUCCESS, msg => {
        res.status(Status.OK).json(msg);
      })
      .on(VALIDATION_ERROR, errors => {
        res
          .status(Status.BAD_REQUEST)
          .json({ type: 'ValidationError', details: errors });
      })
      .on(ERROR, next);

    sendEmail.execute(req.body, req.query);
  }
};

module.exports = EmailController;
