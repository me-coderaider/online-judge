const express=require('express');
const authenticationController=require('../controller/authentication');

const router=express.Router();

router.get('/login',authenticationController.getLogin);

module.exports=router;