const {Sequelize} = require('sequelize');
const sequlize = require('../connection');
const Assessment_competence = require('./assessment_competence');
const Assessment_quastion = require('./assessment_quastion');
const Main_quastion = require('./Main_quastion');
const Ralation_Anceta_User = require('./ralation_anceta_user');
const Info = require('./Info');

const Anceta = sequlize.define('Anceta',{
    id_anceta:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_user_who_assessment:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    id_user_whom_assessment:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    id_type_anceta:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    opinion:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

Anceta.hasMany(Ralation_Anceta_User,{onDelete:'cascade',foreignKey:'id_anceta'});
Anceta.hasMany(Assessment_competence,{onDelete:'cascade',foreignKey:'id_anceta'});
Anceta.hasMany(Assessment_quastion,{onDelete:'cascade',foreignKey:'id_anceta'});
Anceta.hasOne(Info,{onDelete:'cascade'});



module.exports = Anceta;