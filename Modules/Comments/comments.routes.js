import { Router } from "express";
import {
  addComment,
  allComments,
  deleteComment,
  updateComment,
} from "./comments.controllers.js";

const commentRouter = Router();

commentRouter.post("/add", addComment);
commentRouter.get("/", allComments);
commentRouter.put("/update/:id", updateComment);
commentRouter.delete("/delete/:id", deleteComment);

export default commentRouter;
