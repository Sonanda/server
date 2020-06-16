const classroom=require('express').Router();
const ctrl=require('./classroom.ctrl');

classroom.post('/',ctrl);

module.exports=classroom;