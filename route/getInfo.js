const express = require('express');
const router = express.Router();
const alltypeAnceta = require('../Controllers/allTypeAnceta');
const getPersonInfo = require('../Controllers/getPerson');

router.get('/alltypeAnceta',alltypeAnceta);

router.post('/getPersonInfo',getPersonInfo);

module.exports = router;