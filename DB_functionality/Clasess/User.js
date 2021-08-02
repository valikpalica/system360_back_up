const UserModel = require('../../DB_API/models/user');
const soliPass = require('../../CreaptoPass/indxe');
class User{
    registration(obj){
        return new Promise((res,rej)=>{
            console.log('registration');
            try {
                let {surname,name,patronime,position,staff,login,password,repeated_password} = obj;
                if(password === repeated_password){
                    console.log('password equal');
                    soliPass(password).then( async (solidPass)=>{
                        let data = await UserModel.create({
                            Surname:surname,
                            Name:name,
                            Patronime:patronime,
                            Position:position,
                            Staff:staff,
                            login:login,
                            password:solidPass,
                        });
                        console.log(data.dataValues.id_user);
                        res({id:data.dataValues.id_user});
                    }).catch(error=>{
                        console.log(error);
                        rej(error);
                    })
                }
                else{
                    rej('not equal password');
                }
            } catch (error) {
                console.error('-> File User Class registration ->',error);
                rej(error);
            }
        })
    }
    async find(login){
        let person = await UserModel.findOne({where:{login:login}});
        return person;
    }
}

module.exports = new User;