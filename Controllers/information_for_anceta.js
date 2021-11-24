const { findPerson, information_for_anceta,getResultComanderTest,getStatistic} = require("../DB_functionality/Clasess/Admins");


module.exports = (req,res)=>{
    let {surname,name,patronime} = req.body;
    findPerson(req.body).then(data=>{
        let {Position,Rank,Staff,institute,facultet,specialize,graduation} = data[0].dataValues;
        //console.log({Position,Rank,Staff,institute,facultet,specialize,graduation});
        information_for_anceta(data[0].dataValues.id_user).then(async(data)=>{
            console.log(typeof data);
            if(data.dataValues){
                let {id_anceta,id_user_whom_assessment} = data[0].dataValues;
                let {statistic_quastion,statistic_competence} = await getStatistic(id_user_whom_assessment); 
                let obj = format_all_tests(statistic_quastion,statistic_competence);
                let {id_info,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion} = data[0].dataValues.Info.dataValues
                //console.log(`${id_info} ${vidpovidnist} ${stagnenja} ${zaohochenja} ${year_point} ${nedolik} ${pobaganja} ${comander} ${comander_vch} ${comander_mpz} ${opinion}`);
                getResultComanderTest(id_info).then(dataCom =>{
                    res.status(200).json({surname,name,patronime,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion,dataCom,obj,Position,Rank,Staff,institute,facultet,specialize,graduation})
                }).catch(e=>{
                    throw Error(e)
                });
            }
            else{
                res.sendStatus(400);
            }
        }).catch(e=>{
            throw Error(e);
        });
    }).catch(e=>{
        console.error(e);
        res.sendStatus(500);   
    });
};


const format_all_tests = (statistic_quastion,statistic_competence)=>{
    let obj = {
        data_comanders:{
            quastion:[],
            competence:[]
        },
        data_neighborhood:{
            quastion:[],
            competence:[],
        },
        data_staff:{
            quastion:[],
            competence:[],
        },
        data_own:{
            quastion:[],
            competence:[],
        },
    }
    statistic_quastion.forEach(element => {
        if(element.id_type_anceta == 1){
            obj.data_staff.quastion.push({quastion:element.quastion,division:element.division,type_anceta:element.id_type_anceta});
        }
        else if(element.id_type_anceta == 2){
            obj.data_neighborhood.quastion.push({quastion:element.quastion,division:element.division,type_anceta:element.id_type_anceta});
        }
        else if(element.id_type_anceta == 3){
            obj.data_comanders.quastion.push({quastion:element.quastion,division:element.division,type_anceta:element.id_type_anceta});
        }
        else if(element.id_type_anceta == 4){
            obj.data_own.quastion.push({quastion:element.quastion,division:element.division,type_anceta:element.id_type_anceta});
        }
        else{
            console.log('unidentified type_anceta');
        }
    });
    statistic_competence.forEach(element=>{
        if(element.id_type_anceta == 1){
            obj.data_staff.competence.push({competence:element.competence,division:element.division,type_anceta:element.id_type_anceta});
        }
        else if(element.id_type_anceta == 2){
            obj.data_neighborhood.competence.push({competence:element.competence,division:element.division,type_anceta:element.id_type_anceta});
        }
        else if(element.id_type_anceta == 3){
            obj.data_comanders.competence.push({competence:element.competence,division:element.division,type_anceta:element.id_type_anceta});
        }
        else if(element.id_type_anceta == 4){
            obj.data_own.competence.push({competence:element.competence,division:element.division,type_anceta:element.id_type_anceta});
        }
        else{
            console.log('unidentified type_anceta');
        }
    });
    return obj;
}