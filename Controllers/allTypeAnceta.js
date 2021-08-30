const Admins = require('../DB_functionality/Clasess/Admins');
module.exports = (req,res)=>{
    Admins.getAllTypeAnceta().then(data=>{
        console.log(data);
        res.status(200).json({answer:data});
    }).catch(err=>{
        console.error(err);
        res.status(400);
    })
};