const router=require('express').Router();

router.use('/auth',require('./auth'));
router.use('/school',require('./school'));
router.use('/classroom',require('./classroom'));
router.use('/dialogflow',require('./dialogflow'));

module.exports=router;