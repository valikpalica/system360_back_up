
const {Sequelize} = require('sequelize');
const sequlize = require('../connection');


const Assessment_competence = sequlize.define('Assessment_competence',{
    id_assessment:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_competence:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    point_competence:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    id_anceta:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
   
});

module.exports = Assessment_competence;