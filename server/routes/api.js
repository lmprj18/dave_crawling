'use strict';

const express = require('express');
const router = express.Router();
const humor = require('../controlls/humor');

/* GET api listing. */
router.get('/humor', humor.getHumor);

module.exports = router;
