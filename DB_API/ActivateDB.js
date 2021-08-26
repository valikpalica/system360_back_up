const sequlize = require("./connection");

require('./models/Anceta')
require('./models/Type_anceta')
require('./models/assessment_competence');
require('./models/assessment_quastion');
require('./models/competence')
require('./models/quastion')
require('./models/ralation_anceta_user');
require('./models/ralation_competens');
require('./models/ralation_quastion');
require('./models/user');
require('./models/Second_quastion');
require('./models/Main_quastion');




module.exports = async ()=>{
    sequlize.sync({force:true}).then(()=>{
        console.log("Tables have been created");
        require('./dataInfo');
    }).catch(err=>console.log(err));
}