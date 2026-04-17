const express=require('express');
const authRouter=express.Router();

const authWay=require('../controller/authController')


authRouter.get("/verify",authWay.cookie);
authRouter.post("/signup",authWay.signup);
authRouter.post("/login",authWay.login);
authRouter.delete("/logout",authWay.logout);
authRouter.get("/user",authWay.userDetails);



module.exports=authRouter;