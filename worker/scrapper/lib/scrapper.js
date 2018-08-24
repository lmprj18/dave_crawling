'use strict';
const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');
const iconv = require('iconv-lite');
const charset = require('charset');
const moment = require('moment');
const store = require('./store');
const logger = require('./logger');
const util = require('./util');

const blogs_url_dic = {
  todayhumor: {
    url: 'http://www.todayhumor.co.kr/board/list.php?table=bestofbest',
    parser: parseTodayhumor,
    headers: {
      'referer': 'http://www.todayhumor.co.kr/',
    }
  },
  ilbe: {
    url: 'http://www.ilbe.com/index.php?mid=ilbe&sort_index=best&order_type=desc',
    parser: parseIlbe,
    headers: {}
  },
  humoruniv: {
    url: 'http://web.humoruniv.com/board/humor/list.html?table=pds&st=day',
    parser: parseHumoruniv,
    headers: {
      'user-agent': 'test'
    }
  },
  slrclub: {
    url: 'http://www.slrclub.com/bbs/zboard.php?id=best_article',
    parser: parseSlrclub,
    headers: {}
  }
  // dcinside: {
  //   url: 'http://gall.dcinside.com/board/lists?id=game1',
  //   parser: parseDcinside
  // }
}
let list = [];
function scrap () {
  return new Promise(function(resolve, reject) {
    workScrap()
      .then(() => {
        return store.saveBlogList(list);
      })
      .then(() => {
        list = [];
        resolve('success');
      })
      .catch((err) => {
        reject(err);
      })
  })
}

function oneTargetScrap (symbol) {
  if(!blogs_url_dic[symbol]) {
    return Promise.reject(`not find symbol(${symbol})`);
  }
  return new Promise((resolve, reject) => {
    getPageInfo(blogs_url_dic[symbol].url, blogs_url_dic[symbol].headers)
      .then((html) => {
        const _list = blogs_url_dic[symbol].parser(html);
        resolve({html: html, list: _list})
      })
  })
}

function workScrap() {
  return Object.keys(blogs_url_dic).reduce(function(promise, key) {
    return promise
      .then(() => {
        return getPageInfo(blogs_url_dic[key].url, blogs_url_dic[key].headers);
      })
      .then((html) => {
        const _list = blogs_url_dic[key].parser(html);
        _list.forEach(function(value) {
          list.push(value);
        })
        return;
      })
      .catch(function(err) {
        logger.error((new Error(`${key} Error : ${err}`)));
      })
  },Promise.resolve());
}

function getPageInfo (_url, headers) {
  return new Promise(function(resolve, reject) {
    request(_url, {timeout: 60*1000, headers: headers, encoding: null}, function(err, res, html){
      if(err) return reject(err);
      const enc = charset(res.headers, html) // 해당 사이트의 charset값을 획득, encoding
			const i_result = iconv.decode(html, enc) 
      resolve(i_result);
    });
  })
}

function parseIlbe (html) {
  const $ = cheerio.load(html);
  const tableList = $('.boardList>tbody>tr');
  let parseList = [];
  _.forEach(tableList, (tag) => {
    const titleTag = $(tag).children('.title');
    const aTag = titleTag.children('a');
    const title = aTag.text();
    const href = aTag.prop('href');
    const timeTag = $(tag).children('.date');
    const commentTag = titleTag.children('.replyAndTrackback')
    const comment = commentTag.text();
    const goodTag = $(tag).children('.recommend');
    const good = goodTag.text();
    if (title && href) {
      parseList.push({
        key: util.genKey(title+'ilbe'),
        title: title,
        comment: Number(comment) || 0,
        good: Number(good) || 0,
        bad: 0,
        views: 0,
        href: href,
        symbol: 'ilbe'
      });
    }
  })
  return parseList;
}

function parseTodayhumor (html) {
  const $ = cheerio.load(html);
  const tableList = $('.table_list>tbody>tr');
  let parseList = [];
  _.forEach(tableList, (tag) => {
    const titleTag = $(tag).children('.subject');
    const aTag = titleTag.children('a');
    const title = aTag.text();
    let comment =  titleTag.children('.list_memo_count_span').text();
    const href = aTag.prop('href');
    const timeTag = $(tag).children('.date');
    const hitTag = $(tag).children('.hits');
    const views = hitTag.text();
    const gbTag = $(tag).children('.oknok');
    const good = gbTag.text();
    if (comment) {
      comment = comment.replace('[', '').replace(']', '')
    }
    if (title && href) {
      parseList.push({
        key: util.genKey(title+'todayhumor'),
        title: title,
        comment: Number(comment),
        good: Number(good || 0),
        bad: 0,
        views: Number.isNaN(views) ? 0 : Number(views),
        href: `http://www.todayhumor.co.kr${href}`,
        symbol: 'todayhumor'
      });
    }
  })
  return parseList;
}

function parseHumoruniv (html) {
  const $ = cheerio.load(html);
  const tableList = $('table>tbody>tr');
  let parseList = [];
  _.forEach(tableList, (tag) => {
    const titleTag = $(tag).children('.li_sbj');
    const aTag = titleTag.children('a');
    const comments = aTag.children('.list_comment_num').text();
    const fullTitle = aTag.text();
    const href = aTag.prop('href');
    const dateTag = $(tag).children('.li_date');
    const date = dateTag.children('.w_date').text();
    const time = dateTag.children('.w_time').text();
    const gbTag = $(tag).children('.li_und');
    const good = gbTag.children('span').text();
    const bad = gbTag.children('font').text();
    const viewsTag = $(tag).children('.li_date+.li_und');
    const views = viewsTag.text();
    if (fullTitle && href) {
      const title = fullTitle.split(comments)[0].trim();
      parseList.push({
        key: util.genKey(title+'humoruniv'),
        title: title,
        comment: comments.replace('[', '').replace(']', '').trim(),
        good: Number(good || 0),
        bad: Number(bad || 0),
        views: Number.isNaN(Number(views)) ? 0 : Number(views),
        href: `http://web.humoruniv.com/board/humor/${href}`,
        symbol: 'humoruniv'
      });
    }
  })
  return parseList;
}

function parseSlrclub (html) {
  const $ = cheerio.load(html);
  const tableList = $('table>tbody>tr');
  let parseList = [];
  _.forEach(tableList, (tag) => {
    const subjectTag = $(tag).children('.sbj');
    const gbTag = $(tag).children('.list_vote');
    const viewsTag = $(tag).children('.list_click');
    const category = subjectTag.children('span').text();
    const aTag = subjectTag.children('a');
    const fullTitle = subjectTag.text();
    const title = aTag.text();
    let comment = fullTitle.replace(title, '');
    const good = gbTag.text();
    const views = viewsTag.text();
    const href = aTag.prop('href');
    const date = $(tag).children('.list_date').text();
    if (comment) {
      comment = comment.replace('[', '').replace(']', '').trim()
    }
    
    if (title && href) {
      parseList.push({
        key: util.genKey(title+'slrclub'),
        title: title,
        comment: Number(comment) || 0,
        good: Number(good) || 0,
        bad: 0,
        views: Number.isNaN(Number(views)) ? 0 : Number(views),
        href: `http://www.slrclub.com${href}`,
        symbol: 'slrclub'
      });
    }
  })
  return parseList;
}

function parseDcinside (html) {
  const $ = cheerio.load(html);
  return [];
}

exports.scrap = scrap;
exports.oneTargetScrap = oneTargetScrap;
