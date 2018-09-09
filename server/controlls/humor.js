'use strict'

const BlogModel = require('../models/blogSchema');
const logger = require('../libs/logger');

function getHumor(req, res) {
  logger.info('getHumor');
  BlogModel.find()
    .sort({create_t: -1})
    .limit(500)
    .then((data) => {
      res.json({items: data});
    })
    .catch(err => {
      res.send('');
    })
}

module.exports = {
  getHumor: getHumor
}
