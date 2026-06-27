const express=require('express');
const authRouter=express.Router();

const authWay=require('../controller/authController')
const mailWay=require("../controller/sendVerification")


authRouter.get("/verify",authWay.cookie);
authRouter.post("/signup",authWay.signup);
authRouter.post("/login",authWay.login);
authRouter.delete("/logout",authWay.logout);
authRouter.get("/user",authWay.userDetails);
authRouter.post("/verify-email",mailWay.sendVerification);
authRouter.get("/verify-email/:token",mailWay.verificationLink);
authRouter.put("/updateUser",authWay.updateProfile)


module.exports=authRouter;