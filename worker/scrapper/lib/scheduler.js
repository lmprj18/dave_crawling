'use strict';
const schedule = require('node-schedule');
const scrapper = require('./scrapper');
const logger = require('./logger')

let manager = undefined
let isActive = false;

function startScheduler() {
  logger.info('Start scrapper scheduler');
  manager = schedule.scheduleJob('* * * * *', function(){
    if(isActive) {
      return;
    }

    logger.info('Scrap start');
    const profiler = logger.startTimer();
    isActive = true;
    scrapper.scrap()
    .then(function(res){
      logger.info(res);
      logger.info('Scrap end');
      profiler.done({ message: 'scrap' });
      isActive = false;
    })
    .catch(function(err) {
      logger.error('Error', err);
    })
  });  
}

function endScheduler() {
  logger.info('End scrapper scheduler');
  if(!typeof manager === 'function')
    return ;
  manager.cancel();
}

exports.startScheduler = startScheduler;
exports.endScheduler = endScheduler;