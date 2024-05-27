import express from "express";
import cors from "cors";
import { usersModel } from "./Modules/Users/users.controllers.js";
import { postsModel } from "./Modules/Posts/posts.controllers.js";
import { commentsModel } from "./Modules/Comments/comments.controllers.js";
import userRouter from "./Modules/Users/users.routes.js";
import postsRouter from "./Modules/Posts/posts.routes.js";
import commentRouter from "./Modules/Comments/comments.routes.js";
import upcRouter from "./Modules/UsersPostsComments/upc.routes.js";
import { sequelize } from "./Database/dbConnection.js";

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// Create Tables
usersModel;
postsModel;
commentsModel;

app.use("/auth", userRouter);

app.use("/posts", postsRouter);

app.use("/comments", commentRouter);

app.use("/", upcRouter);

sequelize.sync();
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
