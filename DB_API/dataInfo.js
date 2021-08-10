const type_anceta = require('../Data/type_anceta.json');
const competence = require('../Data/competence.json');
const quastion = require('../Data/quastion.json');
const Type_anceta = require('../DB_API/models/Type_anceta');
const Compatence = require('../DB_API/models/competence');
const Quastion = require('../DB_API/models/quastion');
const Ralation_competence = require('../DB_API/models/ralation_competens');
const Ralation_quastion = require('../DB_API/models/ralation_quastion');

const read = async () =>{
    try {
        //console.log(type_anceta);
        type_anceta.forEach(item=>{
            Type_anceta.create({
                        type_anceta:item.type
                    }).then(data=>{
                        //console.log(data);
                    }).catch(err=>{
                        throw new Error(err);
                    })
        });
       // console.log(competence);
        competence.forEach(item=>{
            Compatence.create({
                competence:item.name
            }).then(data=>{
                //console.log(data)
            }).catch(err=>{
                throw new Error(err);
            });
        })
        //console.log(quastion);
        quastion.forEach(item=>{
            Quastion.create({
                quastion:item.name
            }).then(data=>{
                //console.log(data);
            }).catch(err=>{
                throw new Error(err);
            })
        }); 
        //console.log(quastion.type);
       quastion.forEach((obj,index)=>{
            let {types} = obj;
            ++index
            types.forEach(item=>{
                //console.log(index,item);
                Ralation_quastion.create({
                    id_quastion:index,
                    id_type_q:item
                }).then(data=>{
                    //console.log(data);
                }).catch(err=>{
                    throw new Error(err);
                })
            })
       });
       competence.forEach((obj,index)=>{
           let {types} = obj;
           ++index;
           types.forEach(item=>{
               Ralation_competence.create({
                id_competence:index,
                id_type_c:item
               }).then(data=>{
                   //console.log(data);
               }).catch(err=>{
                   throw new Error(err);
               });
           })
       })
    } catch (error) {
        console.error(error);
        return false;
    }
}
read();