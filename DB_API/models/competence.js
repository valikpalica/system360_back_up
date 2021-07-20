const {Sequelize} = require('sequelize');
const sequlize = require('../connection');
const Assessment_competence = require('./assessment_competence');
const ralation_compatance = require('./ralation_competens');

const Competence = sequlize.define('Competence',{
    id_competence:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    competence:{
        type: Sequelize.STRING,
        allowNull:false
    }
});

Competence.hasMany(ralation_compatance,{onDelete:'cascade',foreignKey:'id_competence'});
Competence.hasMany(Assessment_competence,{onDelete:'cascade',foreignKey:'id_competence'});

module.exports = Competence;