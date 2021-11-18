const { findPerson, information_for_anceta,getResultComanderTest,getStatistic} = require("../DB_functionality/Clasess/Admins");


module.exports = (req,res)=>{
    let {surname,name,patronime} = req.body;
    findPerson(req.body).then(data=>{
        let {Position,Rank,Staff,institute,facultet,specialize,graduation} = data[0].dataValues;
        information_for_anceta(data[0].dataValues.id_user).then(async(data)=>{
            let {id_anceta,id_user_whom_assessment} = data[0].dataValues;
            let {statistic_quastion,statistic_competence} = await getStatistic(id_user_whom_assessment); 
            let {id_info,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion} = data[0].dataValues.Info.dataValues
            console.log(`${id_info} ${vidpovidnist} ${stagnenja} ${zaohochenja} ${year_point} ${nedolik} ${pobaganja} ${comander} ${comander_vch} ${comander_mpz} ${opinion}`);
            getResultComanderTest(id_info).then(dataCom =>{

                res.status(200).json({surname,name,patronime,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion,dataCom,statistic_quastion,statistic_competence,Position,Rank,Staff,institute,facultet,specialize,graduation})
            }).catch(e=>{
                throw Error(e)
            });
        }).catch(e=>{
            throw Error(e);
        });
    }).catch(e=>{
        console.error(e);
        res.sendStatus(500);   
    });
};