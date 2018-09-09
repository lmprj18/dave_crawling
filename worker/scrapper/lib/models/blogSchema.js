'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  key: { 
    type: String,
    unique: true
  },
  title: String,
  comment: String,
  good: Number,
  bad: Number,
  views: Number,
  href: String,
  create_t: {
    type: Date,
    index: true
  },
  symbol: String
});

module.exports = mongoose.model('Blog', blogSchema);