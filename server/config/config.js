require('dotenv').config();
const env = process.env;

module.exports = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOSTNAME,
    database: 'SFcinemaDB',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  test: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    host: env.DB_HOSTNAME,
    database: 'SFcinemaDB',
    dialect: 'mysql',
    operatorsAliases: false,
  },
  production: {
    username: env.RDS_USERNAME,
    password: env.RDS_PASSWORD,
    host: env.RDS_HOSTNAME,
    database: 'SFcinemaDB',
    dialect: 'mysql',
    port: 13306,
    operatorsAliases: false,
  },
};
