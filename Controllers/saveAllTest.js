const Admins = require("../DB_functionality/Clasess/Admins");

module.exports = (req,res)=>{
    // console.log('Test all staff');
    // console.log(req.user.id_user);
    let who = req.user.id_user;
    let whom = req.body.personInfo.id_user;
    let {array_quastion,array_compatence,type_anceta} = req.body;
    let obj = return_obj(who,whom,array_quastion,array_compatence,type_anceta);
    Admins.saveAllStaffTest(obj);
    //console.log(req.body);
    res.status(200).json({answer:'ok'});
};

let return_obj = (who,whom,array_quastion,array_competence,type_anceta)=>{
    return {who,whom,array_quastion,array_competence,type_anceta};
};