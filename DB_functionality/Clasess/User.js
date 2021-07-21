const UserModel = require('../../DB_API/models/user');
const generator = require('../../GeneratePassword/indxe');
const sendPass  = require('../../Mail/index');

class User{
    async registration(obj){
        try {
            let {surname,name,patronime,position,mail,staff,login} = obj;
            let password = generator;
            console.log(password);
            await UserModel.create({
                Surname:surname,
                Name:name,
                Patronime:patronime,
                Position:position,
                //Mail:mail,
                Staff:staff,
                login:login,
                password:password,
            });
            return password;
        } catch (error) {
            console.error('-> File User Class registration ->',error);
        }
    }
    change_password(id,password){
        try {
            
        } catch (error) {
            console.error('-> File User class change pass',error);
        }
    }
}

module.exports = new User;