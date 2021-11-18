const {Sequelize} = require('sequelize');
const sequlize = require('../connection');
const Main_quastion = require('../models/Main_quastion');

const assessment_main_quastion = sequlize.define('Assessment_main_quastion',{
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

module.exports = assessment_main_quastion;