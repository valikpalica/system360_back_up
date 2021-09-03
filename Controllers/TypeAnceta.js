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
        let {quastion_distructurize,compatence_distructurize} = data;
        //console.log(data);
        console.log(quastion_distructurize);
        console.log(compatence_distructurize);
        res.cookie('type_anceta',type_anceta);
        res.render('testAll.hbs',{quastion:quastion_distructurize,compatence:compatence_distructurize});
    }
    else if(type ==2){
        console.log(data);
        res.cookie('type_anceta',type_anceta);
        res.render('testComander.hbs',{data:data});
    }
    else{
        res.redirect('/page/main');
    }
}