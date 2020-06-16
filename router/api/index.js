const router=require('express').Router();

router.use('/auth',require('./auth'));
router.use('/school',require('./school'));
router.use('/classroom',require('./classroom'));

module.exports=router;