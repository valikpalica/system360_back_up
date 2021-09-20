const {Sequelize} = require('sequelize');
const sequlize = require('../connection');
const assessment_midle_quastion = require('./assessment_main_quastion');
const assessment_second_quastion = require('./assessment_second_quastion');

const Info = sequlize.define('Info',{
    id_info:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    vidpovidnist:{
        type: Sequelize.STRING,
        allowNull: false
    },
    stagnenja:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    zaohochenja:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    year_point:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nedolik:{
        type: Sequelize.STRING,
        allowNull: false
    },
    pobaganja:{
        type: Sequelize.STRING,
        allowNull: false
    },
    comander:{
        type: Sequelize.STRING,
        allowNull: false
    },
    comander_vch:{
        type: Sequelize.STRING,
        allowNull: false
    },
    comander_mpz:{
        type: Sequelize.STRING,
        allowNull: false
    },
    opinion:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

Info.hasMany(assessment_midle_quastion,{ondeDelete:'cascade',foreignKey:'id_info'});
Info.hasMany(assessment_second_quastion,{onDelete:'cascade',foreignKey:'id_info'});

module.exports = Info;