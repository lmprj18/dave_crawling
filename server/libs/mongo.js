'use strict';

const mongoose = require('mongoose');
const logger = require('./logger');

function start () {
  // mongoose.connect('mongodb://localhost/test');
  const db = mongoose.connection;
  db.on('error', err => {
    logger.error(`mongoose connection error: ${err}`);
  });
  db.once('open', function() {
    logger.info('mongoose connect!');
  });
  
  mongoose.connect('mongodb://localhost/bestofhumor');
}

exports.start = start;
