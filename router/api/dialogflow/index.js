const dialogflow=require('express').Router();
const ctrl=require('./dialogflow.ctrl');

dialogflow.get('/',ctrl.dialogflow);

module.exports=dialogflow;