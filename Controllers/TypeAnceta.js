const ralataion = require('../Data/ralationType.json');
const Admins = require('../DB_functionality/Clasess/Admins');






const typeAnceta = async (id) =>{
    let index = +id;
    if(ralataion.type1.includes(index)){
        console.log('type 1');
        let data = await Admins.getTest(index);
        return {data,type:1};
    }
    else if(ralataion.type2.includes(index)){
        console.log('type 2');
        let data = await Admins.getComanderTest(index);
        return {data,type:2};
    }
    return {};
}


module.exports = async (req,res)=>{
    let {type_anceta} = req.body;
    let {data,type} = await typeAnceta(type_anceta);
    if(type==1){
        console.log(data);
        res.render('testAll.hbs');
    }
    else if(type ==2){
        console.log(data);
        res.render('testComander.hbs');
    }
    else{
        res.redirect('/page/main');
    }
}