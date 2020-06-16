const school=require('express').Router();
const ctrl=require('./school.ctrl');

school.post('/getMeal',ctrl.getMeal);
school.post('/getSchedule',ctrl.getSchedule);

module.exports=school;