const auth=require('express').Router();
const ctrl=require('./auth.ctrl');

auth.post('/generate',ctrl.generate);
auth.post('/compare',ctrl.compare);

module.exports=auth;