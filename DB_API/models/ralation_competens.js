const sequlize = require("../connection");
const {Sequelize} = require('sequelize');

const ralation_compatance = sequlize.define('Ralation_competence',{
    id_ralation_competence:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_competence:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_type_c:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
})

module.exports = ralation_compatance;