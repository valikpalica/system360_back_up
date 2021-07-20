const User = require('../../DB_API/models/user');

class User{
    registration(obj){
        try {
            User.create({
                
            }).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.error(err);
            })
        } catch (error) {
            console.error('-> File User Class 8 row ->',error);
        }
    }
    change_password(id,password){

    }
}

module.exports = User;