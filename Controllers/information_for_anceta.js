const { findPerson } = require("../DB_functionality/Clasess/Admins");


module.exports = (req,res)=>{
    
    findPerson(req.body).then(data=>{
        console.log(data);
    }).catch(e=>{
        res.sendStatus(500);   
    });
    res.sendStatus(300);
    
};