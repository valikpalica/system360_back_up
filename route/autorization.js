const express = require('express');
const passport = require('passport')
const router = express.Router();
const registration = require('../Controllers/registration');
const checkAuth = require('./checkAuth');


router.post('/registration',registration);
router.post('/autorization',passport.authenticate('local',{
    successRedirect: '/page/main',
    failureRedirect: '/auth/autorization',
}));
router.get('/registration',(req,res)=>{
    res.render('registr.hbs');
})

router.get('/autorization',(req,res)=>{
    res.render('auth.hbs');
})
router.get('/main',checkAuth,(req,res)=>{
    console.log(req.user);
    res.send('Main');
});



module.exports = router;