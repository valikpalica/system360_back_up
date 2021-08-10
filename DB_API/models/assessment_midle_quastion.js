const {Sequelize} = require('sequelize');
const sequlize = require('../connection');

const assessment_midle_quastion = sequlize.define('Assessment_midle_quastion',{
    id_assessment:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_info:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_midle_quastion:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    midle_point:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = assessment_midle_quastion;