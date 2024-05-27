import { commentsModel } from "../Comments/comments.controllers.js";
import { postsModel } from "../Posts/posts.controllers.js";
import { usersModel } from "../Users/users.controllers.js";

export const getUserWithPostAndComments = async (req, res) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;

    const user = await usersModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const post = await postsModel.findOne({
      where: { id: postId },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = await commentsModel.findOne({
      where: {
        postId: post.id,
      },
    });
    const data = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      post: {
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.auther,
      },
      comment: comment?.content || "There are no comments",
    };

    res.status(200).json({ message: "Success", data: data });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
