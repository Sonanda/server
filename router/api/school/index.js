const school=require('express').Router();
const ctrl=require('./school.ctrl');

school.get('/meal',ctrl.getMeal);
school.get('/schedule',ctrl.getSchedule);

module.exports=school;