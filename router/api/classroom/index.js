const classroom=require('express').Router();
const ctrl=require('./classroom.ctrl');

classroom.post('/getLink',ctrl.getLink);
classroom.post('/getToken',ctrl.getToken);
classroom.post('/getClass',ctrl.getClass);
classroom.post('/getWork',ctrl.getWork);

module.exports=classroom;