const {Sequelize} = require('sequelize');
const sequlize = require('../connection');

const assessment_second_quastion = sequlize.define('Assessment_second_quastion',{
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
    id_second_quastion:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    point:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = assessment_second_quastion;