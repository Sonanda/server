const classroom=require('express').Router();
const ctrl=require('./classroom.ctrl');

classroom.get('/',ctrl.getLink);
classroom.post('/',ctrl.getToken);
classroom.post('/class',ctrl.getClass);
classroom.post('/work',ctrl.getWork);

module.exports=classroom;