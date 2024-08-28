const log4js = require('log4js');

// Setup Logger
log4js.configure({
  appenders: {
    application: {
      type: 'file',
      filename: `./Logs/${new Date().toDateString().split(' ').join('_')}.log`,
    },
  },
  categories: { default: { appenders: ['application'], level: 'debug' } },
});

const logger = log4js.getLogger('ApplicationLog');
logger.info('Logger Setup Initialized');

module.exports.logger = logger;
