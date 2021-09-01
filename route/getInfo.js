const express = require('express');
const router = express.Router();
const alltypeAnceta = require('../Controllers/allTypeAnceta');
const getPersonInfo = require('../Controllers/getPerson');
const checkAuth = require('./checkAuth');


router.get('/alltypeAnceta',checkAuth,alltypeAnceta);

router.post('/getPersonInfo',checkAuth,getPersonInfo);


module.exports = router;