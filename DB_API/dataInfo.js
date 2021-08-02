const type_anceta = require('../Data/type_anceta.json');
const competence = require('../Data/competence.json');
const quastion = require('../Data/quastion.json');
const Type_anceta = require('../DB_API/models/Type_anceta');
const Compatence = require('../DB_API/models/competence');
const Quastion = require('../DB_API/models/quastion');

const read = async () =>{
    try {
        console.log(type_anceta);
        type_anceta.forEach(item=>{
            Type_anceta.create({
                        type_anceta:item.type
                    }).then(data=>{
                        console.log(data);
                    }).catch(err=>{
                        throw new Error(err);
                    })
        });
        console.log(competence);
        competence.forEach(item=>{
            Compatence.create({
                competence:item.name
            }).then(data=>{
                console.log(data)
            }).catch(err=>{
                throw new Error(err);
            });
        })
        console.log(quastion);
        quastion.forEach(item=>{
            Quastion.create({
                quastion:item.name
            }).then(data=>{
                console.log(data);
            }).catch(err=>{
                throw new Error(err);
            })
        }); 
    } catch (error) {
        console.error(error);
        return false;
    }
}
read();