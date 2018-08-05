const scrapper = require('./lib/scrapper');

scrapper.oneTargetScrap('slrclub')
  .then((result) => {
    // console.log(result.html)
    console.log(result.list)
  })
  .then(err => {
    console.log(err)
  })