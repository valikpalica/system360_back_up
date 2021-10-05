const Admins = require("../DB_functionality/Clasess/Admins");

module.exports = (req,res)=>{
    Admins.getAllInformation(req.body).then(data=>{
        res.status(200).json({answer:data});
    }).catch(err=>{
        res.status(400).json({answer:false});
    })
};