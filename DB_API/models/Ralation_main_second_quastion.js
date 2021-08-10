const {Sequelize} = require('sequelize');
const sequlize = require('../connection');

const Ralation_main_second_quastion = sequlize.define('Ralation_main_second',{
    id_ralation:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_main_quastion:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_second_quastion:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Ralation_main_second_quastion;