const {Sequelize} = require('sequelize');
const sequlize = require('../connection');
const Assessment_quastion = require('./assessment_quastion');
const ralation_quastion = require('./ralation_quastion');

const Quastion = sequlize.define('Quastion',{
    id_quastion:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    quastion:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

Quastion.hasMany(ralation_quastion,{onDelete:'cascade',foreignKey:'id_quastion'});
Quastion.hasMany(Assessment_quastion,{onDelete:'cascade',foreignKey:'id_quastion'});

module.exports = Quastion;