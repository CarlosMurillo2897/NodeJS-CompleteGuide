const Sequlize = require('sequelize');

const sequelize = new Sequlize('node-complete', 'root', 'nodecomplete', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;