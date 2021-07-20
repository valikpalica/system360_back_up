const Sequlize = require('sequelize');
const config = require('./config.json');

const sequlize = new Sequlize(config.name_db,config.owner,config.password,{
    dialect:config.dialect,
    host:config.host
});

module.exports = sequlize;