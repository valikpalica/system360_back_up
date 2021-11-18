const express = require('express');
const router = express.Router();
const typeAnceta = require('../Controllers/TypeAnceta');
const checkAuth = require('./checkAuth');
const statistic = require('../Controllers/statistic');


router.get('/main',checkAuth,(req,res)=>{
    res.render('main.hbs');
});
router.post('/anceta',checkAuth,typeAnceta);
router.get('/statistic',checkAuth,statistic);
router.get('/information',(req,res)=>{
    res.render('Information_from_ancetas.hbs');
});






module.exports = router;