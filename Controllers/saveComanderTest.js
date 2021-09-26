const Admins = require('../DB_functionality/Clasess/Admins');

module.exports = (req,res)=>{
    console.log('comander Test');
    //console.log(req.user);
    let who = req.user.id_user;
    let {id_user} = req.body.personInfo;
    let {type_anceta} = req.body;
    let {vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion} = req.body.info;
    let {array} = req.body;
    let obj = return_obj(who,id_user,type_anceta,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion,array);
    Admins.saveComanderTest(obj).then(data=>{
        res.status(200).json({answer:'ok'});
    }).catch(err=>{
        res.status(400).json({answer:'err'});
    });
    //console.log(req.body);
    
};

let return_obj = (who,whom,type_anceta,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion,array) =>{
    return {who,whom,type_anceta,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion,array}
};