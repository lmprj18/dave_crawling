const winston = require('winston');
const fs = require('fs');
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
var logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/server-%DATE%.log`,
      timestamp: tsFormat,
      datePattern: 'YYMMDD',
      prepend: true,
    })
  ]
});

module.exports = logger
