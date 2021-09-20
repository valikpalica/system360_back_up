const Admins = require('../DB_functionality/Clasess/Admins');

module.exports = (req,res)=>{
    console.log('comander Test');
    //console.log(req.user);
    let who = req.user.id_user;
    console.log(req.body);
    res.status(200).json({answer:'ok'});
};