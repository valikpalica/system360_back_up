const express = require('express');
const router = express.Router();
const alltypeAnceta = require('../Controllers/allTypeAnceta');
const getPersonInfo = require('../Controllers/getPerson');
const saveComanderTest = require('../Controllers/saveComanderTest');
const saveAllTest = require('../Controllers/saveAllTest');
const getSpecialize = require('../Controllers/getSpecialize');
const checkAuth = require('./checkAuth');
const getYearStatistic = require('../Controllers/getYearStatistic');


router.get('/alltypeAnceta',checkAuth,alltypeAnceta);

router.post('/getPersonInfo',checkAuth,getPersonInfo);

router.post('/save',checkAuth,saveAllTest);
router.post('/saveComanderTest',checkAuth,saveComanderTest);
router.get('/specialize',checkAuth,getSpecialize);
router.post('/getYearStatistic',checkAuth,getYearStatistic);
module.exports = router;