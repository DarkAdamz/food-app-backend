import express from "express";
import {loginUser, reqisterUser} from "../controllers/userControllers.js"; //Always add the file ext

const userRouter = express.Router();

userRouter.post("/register", reqisterUser);
userRouter.post("/login", loginUser);

export default userRouter;
