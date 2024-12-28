const express = require("express");
const { signUP, login, signupFile, Loginfile, logoutUser } = require("../Controller/UserController");

const userRouter = express.Router();

userRouter.get("/signUP", signupFile);
userRouter.post("/signUP", signUP);
userRouter.get("/login", Loginfile);
userRouter.post("/login", login);

userRouter.get("/logout", logoutUser);  

module.exports = userRouter;
