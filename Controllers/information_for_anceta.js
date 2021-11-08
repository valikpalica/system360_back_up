const { findPerson, information_for_anceta,getResultComanderTest} = require("../DB_functionality/Clasess/Admins");


module.exports = (req,res)=>{
    let {surname,name,patronime} = req.body;
    findPerson(req.body).then(data=>{
        
        information_for_anceta(data[0].dataValues.id_user).then(data=>{
            let {id_anceta,id_user_whom_assessment} = data[0].dataValues;
            let {id_info,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion} = data[0].dataValues.Info.dataValues
            getResultComanderTest(id_info).then(dataCom =>{
                // dataCom.forEach(item=>{
                //     let {name_main,main_point,array_second} = item;
                //     console.log(`${name_main}-${main_point}`);
                //     array_second.forEach(second_item=>{
                //         let {second_name,second_point} = second_item;
                //         console.log(`${second_name}-${second_point}`);
                //     });
                // });
                res.status(200).json({surname,name,patronime,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion,dataCom})
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