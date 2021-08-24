const express = require('express');
const router = express.Router();
const Admins = require('../DB_functionality/Clasess/Admins');

router.get('/alltypeAnceta',(req,res)=>{
    Admins.getAllTypeAnceta().then(data=>{
        console.log(data);
        res.status(200).json({answer:data});
    }).catch(err=>{
        console.error(err);
        res.status(400);
    })
});
router.get('/getTest',(req,res)=>{
    
});


module.exports = router;