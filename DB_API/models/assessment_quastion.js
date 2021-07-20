
const {Sequelize} = require('sequelize');
const sequlize = require('../connection');


const Assessment_quastion = sequlize.define('Assessment_quastion',{
    id_assessment:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_quastion:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    point_quastion:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    id_anceta:{
        type:Sequelize.INTEGER,
        allowNull:false,
    }
   
});

module.exports = Assessment_quastion;