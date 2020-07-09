const express=require('express');
const app=express();
const PORT=process.env.PORT||4000;
const config=require('./private/config');
const sequelize=require('./models/index').sequelize;

sequelize.sync().catch(err=>{throw err;});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('jwt-secret',config.secret);
app.set('client_id',config.client_id);
app.set('client_secret',config.client_secret);

app.use('/api',require('./router/api'));

app.listen(PORT);