const express = require('express');
const router = express.Router();
const registration = require('../Controllers/registration');

router.post('/registration',registration);
router.post('/autorization',(req,res)=>{});

module.exports = router;