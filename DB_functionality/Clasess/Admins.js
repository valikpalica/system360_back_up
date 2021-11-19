const AnketaModel  = require('../../DB_API/models/Type_anceta');
const RallationQuastion = require('../../DB_API/models/ralation_quastion');
const RallationCompatence = require('../../DB_API/models/ralation_competens');
const Quastion = require('../../DB_API/models/quastion');
const Competence = require('../../DB_API/models/competence');
const Main_quastion = require('../../DB_API/models/Main_quastion');
const Second_quastion  = require('../../DB_API/models/Second_quastion');
const sequlize = require('../../DB_API/connection');
const user = require('../../DB_API/models/user');
const Anceta = require('../../DB_API/models/Anceta');
const Assessment_quastion = require('../../DB_API/models/assessment_quastion');
const Assessment_competence = require('../../DB_API/models/assessment_competence');
const Info = require('../../DB_API/models/Info');
const assessment_main_quastion = require('../../DB_API/models/assessment_main_quastion');
const assessment_second_quastion = require('../../DB_API/models/assessment_second_quastion');
const Ralation_Anceta_User = require('../../DB_API/models/ralation_anceta_user');
const Type_anceta = require('../../DB_API/models/Type_anceta');
const ralation_main_second = require('../../DB_API/models/Ralation_main_second_quastion');




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
                if(index!==query[i].dataValues.id_main_quastion){
                    let obj = {};
                    obj['main'] = query[i].dataValues.name_main_quastion;
                    obj['id_main'] = query[i].dataValues.id_main_quastion;
                    obj['array'] = [];
                    index++; 
                    for(let j = 0;j<query.length;j++){
                        if(index==query[j].dataValues.id_main_quastion){
                            obj['array'].push(
                                {
                                    id_second:query[j].dataValues.id_second_quastion,
                                    second: query[j].dataValues.name_quastion

                            })
                        }
                    }
                    data.push(obj);
                }
            }; 
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
    async getSpecialize(){
        try {
            let data = await user.findAll({
                attributes: ['specialize'],
                distinct: true
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    }
    async getAllInformation({year}){
        try {
            
            let quary_quastions = await sequlize.query(`select (SUM(assessment_quastions.point_quastion)/COUNT(assessment_quastions.id_quastion)) as division, SUM(assessment_quastions.point_quastion) as sum, COUNT(assessment_quastions.id_quastion) as count, quastions.quastion from assessment_quastions inner join quastions on quastions.id_quastion = assessment_quastions.id_quastion inner join anceta on anceta.id_anceta = assessment_quastions.id_anceta inner join ralation_anceta_users on anceta.id_anceta = ralation_anceta_users.id_anceta inner join users on users.id_user = ralation_anceta_users.id_user where users.graduation = "${year}" group by (assessment_quastions.id_quastion)`);
            let quary_competence = await sequlize.query(`select (SUM(assessment_competences.point_competence)/COUNT(assessment_competences.id_competence)) as division, SUM(assessment_competences.point_competence) as sum, COUNT(assessment_competences.id_competence) as count, competences.competence from assessment_competences inner join competences on competences.id_competence = assessment_competences.id_competence inner join anceta on assessment_competences.id_anceta = anceta.id_anceta inner join ralation_anceta_users on anceta.id_anceta = ralation_anceta_users.id_anceta inner join users on users.id_user = ralation_anceta_users.id_user where users.graduation = "${year}"  group by (assessment_competences.id_competence);`);
            
            return {competnce: quary_competence[0],quastion:quary_quastions[0]};
        } catch (error) {
            console.error(error);
        }
    }
    async saveComanderTest(obj){
        try {
            
            let {who,whom,type_anceta,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion,array} = obj;
            Anceta.create({
                id_user_who_assessment:who,
                id_user_whom_assessment:whom,
                id_type_anceta:type_anceta
            }).then(data=>{
                console.log(data);
                Ralation_Anceta_User.create({
                    id_user:whom,
                    id_anceta:data.id_anceta
                }).then(data=>{
                    console.log(data);
                    Info.create({
                        id_info:data.id_anceta, 
                        vidpovidnist:vidpovidnist,
                        stagnenja:stagnenja,
                        zaohochenja:zaohochenja,
                        year_point:year_point,
                        nedolik:nedolik,
                        pobaganja:pobaganja,
                        comander:comander,
                        comander_vch:comander_vch,
                        comander_mpz:comander_mpz,
                        opinion:opinion
                    }).then(async (data)=>{
                        console.log(data);
                        array.forEach(async (item)=>{
                            await assessment_main_quastion.create({
                                id_info:data.id_info,
                                id_midle_quastion:parseInt(item.main),
                                midle_point:item.midle,
                            }).catch(err=>{new Error(err)});
                            item.array.forEach(second_item =>{
                                assessment_second_quastion.create({
                                    id_info:data.id_info,
                                    id_second_quastion: second_item.id,
                                    point:second_item.value
                                }).catch(err=>new Error(err));
                            });
                        });
                    }).catch(err=>{
                        throw new Error(err);
                    });
                }).catch(err=>{
                    throw new Error(err);
                });
                
            }).catch(err=>{
                throw new Error(err);
            });
        } catch (error) {
            console.error(error);
        }
    }
    async saveAllStaffTest(obj){
        try {
            let {who,whom,array_quastion,array_competence,type_anceta} = obj;
            Anceta.create({
                id_user_who_assessment:who,
                id_user_whom_assessment:whom,
                id_type_anceta:type_anceta
            }).then(data=>{
                //console.log(data);
                Ralation_Anceta_User.create({
                    id_user:whom,
                    id_anceta:data.id_anceta
                }).then(data=>{
                    console.log(data);
                }).catch(err=>{
                    throw new Error(err);
                });
                array_quastion.forEach(item=>{
                    Assessment_quastion.create({
                        id_quastion:item.id,
                        point_quastion:item.value,
                        id_anceta:data.id_anceta
                    });
                })
                array_competence.forEach(item=>{
                    Assessment_competence.create({
                        id_competence:item.id,
                        point_competence:item.value,
                        id_anceta:data.id_anceta,
                    });
                });
            }).catch(err=>{
                console.error(err);
            })


        } catch (error) {
            console.error(error);
        }
    };
    async information_for_anceta(id){
        try {
            console.log(id);
            let data = await Anceta.findAll({
                where:{id_user_whom_assessment:id,
                    id_type_anceta:5
                },
                include:[{
                    model:Info,
                }
            ]
            });
            return data;
        } catch (error) {
           throw Error(error);
        }
    };
    async getResultComanderTest(id){
        try {
            let main = [];
            let data = await Main_quastion.findAll({
                include:[
                    {model:assessment_main_quastion,where:{id_info:id}},
                    {model:ralation_main_second}
                ]
            });
            
            for(let i=0;i<data.length;i++){
                    // console.log(data[i].dataValues.name_main_quastion);
                    // console.log(data[i].dataValues.Assessment_main_quastions[0].dataValues.midle_point);
                    let name_main = data[i].dataValues.name_main_quastion;
                    let main_point = data[i].dataValues.Assessment_main_quastions[0].dataValues.midle_point;
                    let array_second = [];
                    let ralation = data[i].dataValues.Ralation_main_seconds;
                    //console.log(`${name_main} ${main_point}`);
                    for(let j = 0;j<ralation.length;j++){
                        //console.log(ralation[j].dataValues.id_second_quastion);
                        let second_index = ralation[j].dataValues.id_second_quastion;
                        let dataSecond = await Second_quastion.findAll({
                            where:{id_second_quastion:second_index},
                            include:[{model:assessment_second_quastion,
                                where:{id_info:id}
                            }]
                        })
                        for(let k = 0;k<dataSecond.length;k++){
                            //console.log(dataSecond[k].dataValues);
                            // console.log(dataSecond[k].dataValues.name_quastion);
                            //console.log(dataSecond[k].dataValues.Assessment_second_quastions[0].dataValues.point);
                            array_second.push({second_name:dataSecond[k].dataValues.name_quastion,
                                second_point:dataSecond[k].dataValues.Assessment_second_quastions[0].dataValues.point});
                        }
                     }
                main.push({name_main,main_point,array_second});
            }

            return main;

            
        } catch (error) {
            throw Error(error);
        }
    }
    async getStatistic(id_user){
        try {
            let query_statistic_quastion = `select anceta.id_user_whom_assessment, anceta.id_type_anceta, assessment_quastions.id_quastion, assessment_quastions.point_quastion, quastions.quastion, COUNT(assessment_quastions.id_quastion) as count, SUM(assessment_quastions.point_quastion) as sum, (SUM(assessment_quastions.point_quastion)/COUNT(assessment_quastions.id_quastion)) as division from anceta inner join assessment_quastions on anceta.id_anceta = assessment_quastions.id_anceta inner join quastions on quastions.id_quastion = assessment_quastions.id_quastion where  anceta.id_user_whom_assessment = "${id_user}" group by quastions.id_quastion, anceta.id_type_anceta order by anceta.id_type_anceta,assessment_quastions.id_quastion;`;
            let statistic_quastion = await sequlize.query(query_statistic_quastion);
            let query_statistic_competence = `select anceta.id_user_whom_assessment, anceta.id_type_anceta, assessment_competences.id_competence, competences.competence, COUNT(assessment_competences.id_competence) as count, SUM(assessment_competences.point_competence) as sum, (SUM(assessment_competences.point_competence)/ COUNT(assessment_competences.id_competence)) as division from anceta inner join assessment_competences on anceta.id_anceta = assessment_competences.id_anceta inner join competences on competences.id_competence  = assessment_competences.id_competence where anceta.id_user_whom_assessment = "${id_user}" group by competences.id_competence, anceta.id_type_anceta order by anceta.id_type_anceta,assessment_competences.id_competence;`;
            let statistic_competence = await sequlize.query(query_statistic_competence);
        return {statistic_quastion:statistic_quastion[0],statistic_competence:statistic_competence[0]};
        } catch (error) {
            throw new Error(error);
        }
    };
}
module.exports = new Admins;