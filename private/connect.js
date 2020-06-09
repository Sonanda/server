const mysql=require('mysql');
const config=require('./config');

const info={
    host: config.url,
    port: '3306',
    user: config.user,
    password: config.pw,
    database: config.database
}
module.exports = {
    create:()=>{
        return mysql.createConnection(info);
    },
    connect:(conn)=>{
        conn.connect(function(err) {
            if(err) throw err;
        });
    }
}