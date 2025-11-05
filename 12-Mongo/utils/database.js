const Sequlize = require('sequelize');

const sequelize = new Sequlize('node-complete', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3307
});

module.exports = sequelize;