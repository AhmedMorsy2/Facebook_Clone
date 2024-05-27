import { Router } from "express";
import { getUserWithPostAndComments } from "./upc.controllers.js";

const upcRouter = Router();
upcRouter.get("/user/:userId/post/:postId", getUserWithPostAndComments);
export default upcRouter;
