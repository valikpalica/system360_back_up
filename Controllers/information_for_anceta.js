const { findPerson, information_for_anceta,getResultComanderTest} = require("../DB_functionality/Clasess/Admins");


module.exports = (req,res)=>{
    
    findPerson(req.body).then(data=>{
        //console.log(data);
        //console.log(data[0].dataValues.id_user);
        information_for_anceta(data[0].dataValues.id_user).then(data=>{
            let {id_anceta,id_user_whom_assessment} = data[0].dataValues;
            let {id_info,vidpovidnist,stagnenja,zaohochenja,year_point,nedolik,pobaganja,comander,comander_vch,comander_mpz,opinion} = data[0].dataValues.Info.dataValues
            getResultComanderTest(id_info).then(dataCom =>{
                dataCom.forEach(item=>{
                    let {name_main,main_point,array_second} = item;
                    console.log(`${name_main}-${main_point}`);
                    array_second.forEach(second_item=>{
                        let {second_name,second_point} = second_item;
                        console.log(`${second_name}-${second_point}`);
                    });
                });
            });
        }).catch(e=>{
            console.error(e);
        });

    }).catch(e=>{
        res.sendStatus(500);   
    });
    res.sendStatus(300);
    
};