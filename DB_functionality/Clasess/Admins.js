const AnketaModel  = require('../../DB_API/models/Type_anceta');
const RallationQuastion = require('../../DB_API/models/ralation_quastion');
const RallationCompatence = require('../../DB_API/models/ralation_competens');
const Quastion = require('../../DB_API/models/quastion');
const Competence = require('../../DB_API/models/competence');

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
    async getTest(typeAncetaId){
        return new Promise((res,rej)=>{
            try {
                let quastion = await this.getQuastionToAnceta(typeAncetaId);
                let compatence = await this.getCompatanceToAnceta(typeAncetaId);
                log(quastion,compatence);
                if(quastion.length == 0||compatence.length == 0){
                    rej('no data');
                }
                else{
                    res({quastion,compatence});
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
            console.log(data);
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
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    writeQuastion(array){
        return new Promise((res,rej)=>{
            try {
                console.log(array);
                // array.map(item=>{
                //     Quastion.create({
                //         quastion:item.name,
                //     })
                // })
            } catch (error) {
                rej(error);
            }
        });
    };
    writeCompatence(array){
        return new Promise((res,rej)=>{
            try {
                console.log(array);
                // array.map(item=>{
                //     Competence.create({
                //         competence:item.name,
                //     });
                // })
            } catch (error) {
                rej(error);
            }
        })
    }
    createRallationQuastion(array){
        return new Promise((res,rej)=>{
            try {
                
            } catch (error) {
                rej(error);
            }
        })
    }
    createRallationCompetence(array){
        return new Promise((res,rej)=>{
            try {
                
            } catch (error) {
                rej(error);
            }
        })
    }
}
module.exports = new Admins;