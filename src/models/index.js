const { Sequelize, DataTypes } = require('sequelize');
const PlantModel = require('./plant');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
  });

  const Plant = PlantModel(connection, Sequelize);

  connection.sync({ alter: true });
  return { Plant };
};

module.exports = setupDatabase();
