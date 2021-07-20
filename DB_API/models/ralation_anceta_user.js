
const {Sequelize} = require('sequelize');
const sequlize = require('../connection');

const Ralation_Anceta_User = sequlize.define('Ralation_Anceta_User',{
    id_ralation_anceta_user:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    id_user:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    id_anceta:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
})
module.exports = Ralation_Anceta_User;