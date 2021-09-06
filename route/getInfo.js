const express = require('express');
const router = express.Router();
const alltypeAnceta = require('../Controllers/allTypeAnceta');
const getPersonInfo = require('../Controllers/getPerson');
const checkAuth = require('./checkAuth');


router.get('/alltypeAnceta',checkAuth,alltypeAnceta);

router.post('/getPersonInfo',checkAuth,getPersonInfo);

router.post('/save',checkAuth,(req,res)=>{
    //console.log(req.user);
    console.log(req.body);
    res.status(200).json({answer:'ok'});
});
router.post('/saveComanderTest',(req,res)=>{
    //console.log(req.user);
    console.log(req.body);
    res.status(200).json({answer:'ok'});
});

module.exports = router;