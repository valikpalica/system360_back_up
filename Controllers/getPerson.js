const Admins = require('../DB_functionality/Clasess/Admins');
module.exports = (req,res)=>{
    Admins.findPerson(req.body).then(data=>{
        if(data){
            res.status(200).json({answer:data});
        }
        else{
            res.status(500);
        }
    }).catch(err=>{
        console.error(err);
        res.status(400);
    })
};