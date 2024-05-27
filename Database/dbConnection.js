import { Sequelize } from "sequelize";
export const sequelize = new Sequelize(
  "mysql://us8onchspwpova9e:Wq7jaWdBIBHGywzJf8Db@bwzgzngqcz1ykxuh9qce-mysql.services.clever-cloud.com:3306/bwzgzngqcz1ykxuh9qce"
);
sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => console.log(err));
