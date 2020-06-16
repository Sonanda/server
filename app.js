const express=require('express');
const app=express();
const PORT=process.env.PORT||4000;

const config=require('./private/config');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set('jwt-secret',config.secret);

app.use('/api',require('./router/api'));

app.listen(PORT);