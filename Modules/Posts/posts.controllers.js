import { DataTypes } from "sequelize";
import { sequelize } from "../../Database/dbConnection.js";
import { usersModel } from "../Users/users.controllers.js";

const postsModel = sequelize.define(
  "posts",
  {
    title: {
      type: DataTypes.STRING(200),
    },
    content: {
      type: DataTypes.STRING(200),
    },
    author: {
      type: DataTypes.INTEGER,
      references: {
        model: usersModell,
        key: "id",
      },
    },
  },
  {}
);

// ! Post Functions
const addPost = async (req, res) => {
  try {
    await postsModel.create(req.body);
    res.status(200).json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error" });
  }
};

const allPosts = async (req, res) => {
  try {
    let posts = await postsModel.findAll();
    res.status(200).json({ message: "Success", posts });
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};

const updatePost = async (req, res) => {
  try {
    let [exist] = await postsModel.update(
      {
        title: req.body.title,
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
      res.status(404).json({ message: "Post Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};

const deletePost = async (req, res) => {
  try {
    let exist = await postsModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (exist) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(404).json({ message: "Post Not Found" });
    }
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};

const postAuthor = async (req, res) => {
  try {
    let post = await postsModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    let user = await usersModel.findOne({
      where: {
        id: post.author,
      },
    });

    const data = {
      Post_id: post.id,
      Title: post.title,
      Author_id: post.author,
      Author_Name: user.username,
    };

    res.status(200).json({ message: "Success", data });
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};
export { postsModel, addPost, allPosts, updatePost, deletePost, postAuthor };
