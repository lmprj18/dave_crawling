'use strict';

const mongoose = require('mongoose');
const logger = require('./lib/logger');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', err => {
  logger.error(`mongoose connection error: ${err}`);
});
db.once('open', function() {
  logger.info('mongoose connect!');
});

mongoose.connect('mongodb://localhost/bestofhumor');
