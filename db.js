import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('node_test', 'postgres', '123456', {
   host: 'localhost',
   port: '5432',
   dialect: 'postgres'
})
