const Sequelize = require("sequelize")

const role = {
  name: {
      type: Sequelize.STRING(32),
      primaryKey: true,
      allowNull: false
  }
}

module.exports = role