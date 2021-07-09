const Sequelize = require("sequelize")

const user = {
  name: {
      type: Sequelize.STRING(32),
      allowNull: false
  },
  login: {
      type: Sequelize.STRING(16),
      primaryKey: true,
      allowNull: false
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: {
      type: Sequelize.STRING(64),
      unique: true,
      allowNull: false
  }
}

module.exports = user