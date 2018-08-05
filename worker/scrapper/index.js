'use strict';
const scheduler = require('./lib/scheduler');
const mongo = require('./mongo')

~function main () {
  scheduler.startScheduler();
}()