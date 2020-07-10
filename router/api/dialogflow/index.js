const dialogflow=require('express').Router();
const ctrl=require('./dialogflow.ctrl');

dialogflow.get('/',ctrl);

module.exports=dialogflow;