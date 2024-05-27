import { Router } from "express";
import { adduser, signin } from "./users.controllers.js";

const userRouter = Router();

userRouter.post("/addUser", adduser);
userRouter.post("/signin", signin);

export default userRouter;
