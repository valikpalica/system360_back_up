const express = require('express');
const router = express.Router();
const checkAuth = require('./checkAuth');


router.get('/main',checkAuth,(req,res)=>{
    res.render('main.hbs');
});
router.post('/anceta',checkAuth,(req,res)=>{
    let {type_anceta} = req.body;
    console.log(type_anceta);
    res.send(`Type anceta ${type_anceta}`);
});






module.exports = router;