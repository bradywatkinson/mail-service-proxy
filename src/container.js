const { createContainer, asClass, asFunction, asValue } = require("awilix");
const { scopePerRequest } = require("awilix-express");

const config = require("../config");
const Application = require("./app/Application");
const SendEmail = require("./app/email/SendEmail");

const Server = require("./interfaces/http/Server");
const router = require("./interfaces/http/router");
const loggerMiddleware = require("./interfaces/http/logging/loggerMiddleware");
const errorHandler = require("./interfaces/http/errors/errorHandler");
const devErrorHandler = require("./interfaces/http/errors/devErrorHandler");
const swaggerMiddleware = require("./interfaces/http/swagger/swaggerMiddleware");

const logger = require("./infra/logging/logger");
const jsonValidator = require("./infra/jsonValidator/jsonValidator");
const MailgunEmail = require("./infra/email/MailgunEmail");
const MailgunAPI = require("./infra/email/MailgunAPI");
const SendgridEmail = require("./infra/email/SendgridEmail");
const SendgridAPI = require("./infra/email/SendgridAPI");

const container = createContainer();

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton()
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
    jsonValidator: asFunction(jsonValidator).singleton()
  })
  .register({
    config: asValue(config)
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton()
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware])
  });

// Operations
container.register({
  sendEmail: asClass(SendEmail)
});

// APIs
container.register({
  mailgunAPI: asClass(MailgunAPI).singleton(),
  sendgridAPI: asClass(SendgridAPI).singleton()
});

container.register({
  mailgunEmail: asClass(MailgunEmail),
  sendgridEmail: asClass(SendgridEmail)
});

module.exports = container;
