const Sequelize = require("sequelize")

const worker = {
  name: {
      type: Sequelize.STRING(32),
      allowNull: false
  },
  phone: {
      type: Sequelize.STRING(16),
      primaryKey: true,
      allowNull: false
  },
  avatar: {
      type: Sequelize.STRING,
      allowNull: true
  },
  email: {
      type: Sequelize.STRING(64),
      unique: true,
      allowNull: false
  }
}

module.exports = worker