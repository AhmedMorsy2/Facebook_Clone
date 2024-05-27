import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../../Database/dbConnection.js";

const usersModel = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(200),
    },
    email: {
      type: DataTypes.STRING(200),
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
    },
  },
  {}
);

// ! Users Functions
const adduser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    // Check if emailExists
    const emailExist = await usersModel.findOne({ where: { email } });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    req.body.password = await bcrypt.hash(req.body.password, 8);
    await usersModel.create(req.body);
    res.status(201).json({ message: "Success" });
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({
      where: { email },
    });
    // Check If Empty
    if (!email || !password) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordExists = await bcrypt.compare(password, user.password);
    if (!passwordExists) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const data = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({ message: "Success", data: data });
  } catch (err) {
    return res.status(500).json({ Message: "Internal Server Error", err });
  }
};

export { usersModel, adduser, signin };
