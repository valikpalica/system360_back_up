const sequlize = require("../connection");
const {Sequelize} = require('sequelize');

const ralation_quastion = sequlize.define('Ralation_quastion',{
    id_ralation_quastion:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_quastion:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_type_q:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
})

module.exports = ralation_quastion;