const express=require('express');
const app=express();
const PORT=process.env.PORT||4000;

const config=require('./private/config');

app.set('jwt-secret',config.secret);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api',require('./router/api'));

app.listen(PORT);