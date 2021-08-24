const {Sequelize} = require('sequelize');
const sequlize = require('../connection');
const assessment_midle_quastion = require('./assessment_midle_quastion');
const Ralation_main_second_quastion = require('./Ralation_main_second_quastion');

const Main_quastion = sequlize.define('Main_Quastion',{
    id_main_quastion:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_type_anceta:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name_main_quastion:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Main_quastion.hasMany(Ralation_main_second_quastion,{onDelete:'cascade',foreignKey:'id_main_quastion'});
Main_quastion.hasMany(assessment_midle_quastion,{onDelete:'cascade',foreignKey:'id_midle_quastion'});

module.exports  = Main_quastion;