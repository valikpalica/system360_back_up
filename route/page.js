const express = require('express');
const router = express.Router();
const typeAnceta = require('../Controllers/TypeAnceta');
const checkAuth = require('./checkAuth');


router.get('/main',checkAuth,(req,res)=>{
    res.render('main.hbs');
});
router.post('/anceta',async (req,res)=>{
    let {type_anceta} = req.body;
    let {data,page} = await typeAnceta(type_anceta);
    console.log(data);
    res.render(page);
});






module.exports = router;