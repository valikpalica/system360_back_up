const {Sequelize} = require('sequelize');
const sequlize = require('../connection');
const assessment_second_quastion = require('./assessment_second_quastion');
const Ralation_main_second_quastion = require('./Ralation_main_second_quastion');

const Second_quastion = sequlize.define('Second_quastion',{
    id_second_quastion:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name_quastion:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Second_quastion.hasMany(Ralation_main_second_quastion,{onDelete:'cascade',foreignKey:'id_second_quastion'});
Second_quastion.hasMany(assessment_second_quastion,{onDelete:'cascade',foreignKey:'id_second_quastion'});

module.exports = Second_quastion;