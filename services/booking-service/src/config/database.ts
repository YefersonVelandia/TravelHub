import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: env.database.host,
  port: env.database.port,
  database: env.database.name,
  username: env.database.user,
  password: env.database.password,

  logging: false,
});
