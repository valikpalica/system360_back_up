const express = require('express');
const router = express.Router();
const typeAnceta = require('../Controllers/TypeAnceta');
const checkAuth = require('./checkAuth');


router.get('/main',checkAuth,(req,res)=>{
    res.render('main.hbs');
});
router.post('/anceta',checkAuth,typeAnceta);






module.exports = router;