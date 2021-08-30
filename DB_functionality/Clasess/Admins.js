const AnketaModel  = require('../../DB_API/models/Type_anceta');
const RallationQuastion = require('../../DB_API/models/ralation_quastion');
const RallationCompatence = require('../../DB_API/models/ralation_competens');
const Quastion = require('../../DB_API/models/quastion');
const Competence = require('../../DB_API/models/competence');
const Main_quastion = require('../../DB_API/models/Main_quastion');
const sequlize = require('../../DB_API/connection');
const user = require('../../DB_API/models/user');

class Admins{
    async getAllTypeAnceta(){
        try {
         let types = await  AnketaModel.findAll({raw:true});
            return types;
        } catch (error) {
            console.error(error);
            return [];    
        }
    };
    getTest(typeAncetaId){
        return new Promise(async (res,rej)=>{
            try {
                let quastion = await this.getQuastionToAnceta(typeAncetaId);
                let compatence = await this.getCompatanceToAnceta(typeAncetaId);
                //log(quastion,compatence);
                if(quastion.length == 0 || compatence.length == 0){
                    rej('no data');
                }
                else{
                    let quastion_distructurize = [];
                    let compatence_distructurize = [];
                    quastion.forEach(element => {
                        quastion_distructurize.push(element.dataValues);
                    });
                    compatence.forEach(element=>{
                        compatence_distructurize.push(element.dataValues);
                    });
                    res({quastion_distructurize,compatence_distructurize});
                }
            } catch (error) {
                rej(error);
            }
        })
    }
    async getQuastionToAnceta(typeAncetaId){
        try{
            let data = await Quastion.findAll({
                include:[{
                    model:RallationQuastion,
                    where:{
                        id_type_q : typeAncetaId,
                    }
                }]
            });
            //console.log(data);
            return data;
        }
        catch(err){
            console.error(err);
            return [];
        }
    }
    async getCompatanceToAnceta(typeAncetaId){
        try {
            let data = await Competence.findAll({include:[{
                model: RallationCompatence,
                where:{
                    id_type_c:typeAncetaId,
                }
            }]});
            //console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getComanderTest(type){
        try {
            let query = await sequlize.query('select * from main_quastions inner join ralation_main_seconds on main_quastions.id_main_quastion = ralation_main_seconds.id_main_quastion inner join second_quastions on ralation_main_seconds.id_second_quastion = second_quastions.id_second_quastion', {
                model: Main_quastion,
                where: {
                    id_type_anceta:type
                }
            });
            let data = [];
            let index = 0;
            for(let i=0;i<query.length;i++){
                //console.log(query[i].dataValues);
                console.log('index!==data.dataValues.id_main_quastion' , index!==query[i].dataValues.id_main_quastion);
                if(index!==query[i].dataValues.id_main_quastion){
                    let obj = {};
                    obj['main'] = query[i].dataValues.name_main_quastion;
                    obj['id_main'] = query[i].dataValues.id_main_quastion;
                    obj['array'] = [];
                    index++;
                    console.log(obj);
                    console.log('index' , index);
                    for(let j = 0;j<query.length;j++){
                        console.log('index==data.dataValues.id_main_quastion',index==query[j].dataValues.id_main_quastion);
                        if(index==query[j].dataValues.id_main_quastion){
                            obj['array'].push(
                                {
                                    id_second:query[j].dataValues.id_second_quastion,
                                    second: query[j].dataValues.name_quastion

                            })
                        }
                    }
                    console.log('finish');
                    //console.log(obj);
                    data.push(obj);
                }

            };
            //console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async findPerson(obj){
        try {
            let {surname,name,patronime} = obj;
            let data = await user.findAll({where:{
                Surname:surname,
                Name:name,
                Patronime:patronime,
            }});
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}
module.exports = new Admins;