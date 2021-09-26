const Admins = require("../DB_functionality/Clasess/Admins")

module.exports = (req,res)=>{
    Admins.getSpecialize().then(data=>{
        res.status(200).json({array:data});
    }).catch(err=>{
        res.status(400).json({array:false});
    })   
}