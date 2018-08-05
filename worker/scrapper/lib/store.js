'use strict';

const fs = require('fs');
const _ = require('lodash');
const config = require('../config');
const BlogModel = require('./models/blogSchema');

//처음에 데이터를 가져오고 다음 데이터와 비교하여 추가 되는 항목만 삽입하는 시간대로 Blog 데이터를 삽입하여 준다
function saveBlogList (list) {
  return new Promise((resolve, reject) => {
    BlogModel.insertMany(list)
      .then((res) => {
        console.log(res)
      })
  })
}

// function saveBlogList (list) {
//   return new Promise(function (resolve, reject) {
//     if (!list || list.length === 0) { return reject(new Error('not found list data.(saveList Error)')); }
//     var contextList = [];
//     _.forEach(list, function(value) {
//       contextList.push(`${value.title}    ${value.href}    ${value.time}    ${value.symbol}`);
//     })
//     fs.writeFile(config.blogDataFilePath, contextList.join('\n'), function(err){
//       if (err) return reject(err);
//       resolve('success');
//     })
//   })
// }

function loadBlogList (list) {
  return new Promise(function(resolve, reject) {
    fs.readFile(config.blogDataFilePath, function(err, context) {
      if (err) return reject(err);
      resolve(context);
    })
  })
}

exports.saveBlogList = saveBlogList;
exports.loadBlogList = loadBlogList;