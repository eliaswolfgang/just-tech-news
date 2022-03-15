const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(
    process.env.JAWS_DB,
    process.env.JAWS_USER,
    process.env.JAWS_PASS,
    { host: JAWS_HOST, dialect: 'mysql', port: JAWS_PORT }
  );
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

module.exports = sequelize;
