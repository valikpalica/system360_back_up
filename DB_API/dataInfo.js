const type_anceta = require('../Data/type_anceta.json');
const competence = require('../Data/competence.json');
const quastion = require('../Data/quastion.json');
const Type_anceta = require('../DB_API/models/Type_anceta');
const Compatence = require('../DB_API/models/competence');
const Quastion = require('../DB_API/models/quastion');
const Ralation_competence = require('../DB_API/models/ralation_competens');
const Ralation_quastion = require('../DB_API/models/ralation_quastion');
const comanderTest = require('../Data/comanderTest.json');
const Main_Quastion = require('../DB_API/models/Main_quastion');
const Ralation_main_second_quastion =  require('../DB_API/models/Ralation_main_second_quastion');
const Second_quastion = require('../DB_API/models/Second_quastion');
let index_for_ralation_main_and_second = 0;

const read = async () =>{
    try {
        //console.log(type_anceta);
        type_anceta.forEach(async (item)=>{
           await Type_anceta.create({
                        id_type_anceta: item.id,
                        type_anceta:item.type
                    })
        });
       


    for(let i=0;i<quastion.length;i++){
        let {types} = quastion[i];
        let id_quastion = i + 1;
        await Quastion.create({
            id_quastion,
            quastion:quastion[i].name
        });
        await read_types_ralation_quastion(id_quastion,types);
    };

    for(let i = 0;i<competence.length;i++){
        let {types} = competence[i];
        let id_competence = i + 1;
        await Compatence.create({
            id_competence,
            competence:competence[i].name
        })
        await read_types_ralation_competence(id_competence,types);
    };

       for(let i=0;i<comanderTest.data.length;i++){
        try {
            let j = i;
            await Main_Quastion.create({
                id_type_anceta:comanderTest.type,
                name_main_quastion:comanderTest.data[i].main
            });
            console.log(comanderTest.data[i].second);
            await write_second_quastion(comanderTest.data[i].second,++j);
        } catch (err) {
            throw new Error(err);
        }
       };
    } catch (error) {
        console.error(error);
        return false;
    }
}

const write_second_quastion  = async (array,main_index) =>{

    try {
        for(let i=0;i<array.length;i++){
            await Second_quastion.create({
                    name_quastion:array[i]
                });
            await write_ralation_main_second(main_index,++index_for_ralation_main_and_second);
        }
    } catch (error) {
        throw new Error(error);
    }
};

const write_ralation_main_second = async (id_main,id_second) =>{
    try {
        await Ralation_main_second_quastion.create({
            id_main_quastion:id_main,
            id_second_quastion:id_second,
        });
    } catch (error) {
        throw new Error(error);
    }
};


const read_types_ralation_quastion = async (id_quastion,types)=>{
    try {

        for(let i=0;i<types.length;i++){
            let id_types = types[i];
            await Ralation_quastion.create({
                id_quastion:id_quastion,
                id_type_q:id_types
            })
        }
    } catch (error) {
        throw new Error(error);
    }
};

const read_types_ralation_competence = async (id_competence,types)=>{
    try {
        for(let i=0;i<types.length;i++){
            let id_types = types[i];
            await Ralation_competence.create({
                id_competence:id_competence,
                id_type_c:id_types
            })
        }
    } catch (error) {
        throw new Error(error);
    }
};


read();