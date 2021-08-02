const bcrypt = require('bcrypt');
const soli = 10;

module.exports  = async (password) =>{
    console.log(password);
        try{
            let salt = await bcrypt.genSalt(soli);
            console.log(salt, '-> salt');
            let hash = await bcrypt.hash(password,salt);
            console.log(hash,'-> hash');
            return hash;
        }
        catch(err){
            console.log(err);
        }
}
