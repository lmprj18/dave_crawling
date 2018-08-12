'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  key: String,
  title: String,
  comment: String,
  good: Number,
  bad: Number,
  views: Number,
  href: String,
  date: {
    type: Date
  },
  symbol: String
});

module.exports = mongoose.model('Blog', blogSchema);