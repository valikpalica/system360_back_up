const sequlize = require("./DB_API/connection");

require('./DB_API/models/Anceta')
require('./DB_API/models/Type_anceta')
require('./DB_API/models/assessment_competence');
require('./DB_API/models/assessment_quastion');
require('./DB_API/models/competence')
require('./DB_API/models/quastion')
require('./DB_API/models/ralation_anceta_user');
require('./DB_API/models/ralation_competens');
require('./DB_API/models/ralation_quastion');
require('./DB_API/models/user');
require('./DB_API/models/Second_quastion');
require('./DB_API/models/Main_quastion');



sequlize.sync({force:true}).then(()=>{
    console.log("Tables have been created");
    require('./DB_API/dataInfo');
}).catch(err=>console.log(err));

    