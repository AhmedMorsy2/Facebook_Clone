import { DataTypes } from "sequelize";
import { sequelize } from "../../Database/dbConnection.js";
import { usersModel } from "../Users/users.controllers.js";
import { postsModel } from "../Posts/posts.controllers.js";

// Create Comments Table
const commentsModel = sequelize.define(
  "comments",
  {
    content: {
      type: DataTypes.STRING(200),
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: postsModel,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: usersModel,
        key: "id",
      },
    },
  },
  {}
);

// ! Comments Functions
const addComment = async (req, res) => {
  const { postId } = req.body;
  try {
    const post = await postsModel.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post is Unavailable" });
    }
    await commentsModel.create(req.body);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

const allComments = async (req, res) => {
  try {
    let Comments = await commentsModel.findAll();
    res.status(200).json({ message: "Success", Comments });
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};

const updateComment = async (req, res) => {
  try {
    let [exist] = await commentsModel.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (exist) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "comment Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};

const deleteComment = async (req, res) => {
  try {
    let exist = await commentsModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (exist) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "comment Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};
export { commentsModel, addComment, allComments, updateComment, deleteComment };
