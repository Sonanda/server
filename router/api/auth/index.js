const auth=require('express').Router();
const ctrl=require('./auth.ctrl');

auth.get('/',ctrl.getData);
auth.post('/',ctrl.login);
auth.patch('/',ctrl.updateData1);
auth.put('/',ctrl.updateData2);

module.exports=auth;