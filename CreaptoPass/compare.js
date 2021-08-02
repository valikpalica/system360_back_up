const bcrypt = require('bcrypt');

module.exports = async (password,hash) =>{
    try {
        return await bcrypt.compare(password,hash);
    } catch (error) {
        console.log(error);
    }
}