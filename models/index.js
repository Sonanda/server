const Sequelize=require('sequelize');
const config=require('../private/config');
const db={};

const sequelize=new Sequelize({
    host: config.host,
    username: config.user,
    password: config.pw,
    port: 3306,
    database: config.db,
    dialect: 'mysql'
});

db.sequelize=sequelize;
db.Sequelize=Sequelize;

db.User=require('./user')(sequelize,Sequelize);

module.exports = db;