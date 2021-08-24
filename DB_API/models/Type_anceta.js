const sequlize = require("../connection");
const {Sequelize} = require('sequelize');
const Anceta = require('./Anceta');

const ralation_compatance = require("./ralation_competens");
const ralation_quastion = require("./ralation_quastion");
const Main_quastion = require("./Main_quastion");

const Type_anceta = sequlize.define('Type_anceta',{
    id_type_anceta:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull:false,
    },
    type_anceta:{
        type:Sequelize.STRING,
        allowNull:false,
    }
});

Type_anceta.hasMany(Anceta,{onDelete:'cascade',foreignKey:'id_type_anceta'});
Type_anceta.hasMany(ralation_compatance,{onDelete:'cascade',foreignKey:'id_type_c'});
Type_anceta.hasMany(ralation_quastion,{onDelete:'cascade',foreignKey:'id_type_q'});
Type_anceta.hasMany(Main_quastion,{onDelete:'cascade',foreignKey:'id_type_anceta'});
module.exports = Type_anceta;
