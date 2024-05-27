import { Router } from "express";
import {
  addPost,
  allPosts,
  deletePost,
  postAuthor,
  updatePost,
} from "./posts.controllers.js";

const postsRouter = Router();

postsRouter.get("/", allPosts);
postsRouter.post("/addPost", addPost);
postsRouter.put("/updatePost/:id", updatePost);
postsRouter.delete("/deletePost/:id", deletePost);
postsRouter.get("/postAuthor/:id", postAuthor);

export default postsRouter;
