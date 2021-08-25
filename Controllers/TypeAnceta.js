const ralataion = require('../Data/ralationType.json');
const Admins = require('../DB_functionality/Clasess/Admins');

const typeAnceta = async (id) =>{
    let index = +id;
    if(ralataion.type1.includes(index)){
        console.log('type 1');
        let data = await Admins.getTest(index);
        return {data,page:'testAll.hbs'};
    }
    else if(ralataion.type2.includes(index)){
        console.log('type 2');
        let data = await Admins.getComanderTest(index);
        return {data,page:'testComander.hbs'};
    }
    else{
        return false;
    }
}
module.exports = typeAnceta;