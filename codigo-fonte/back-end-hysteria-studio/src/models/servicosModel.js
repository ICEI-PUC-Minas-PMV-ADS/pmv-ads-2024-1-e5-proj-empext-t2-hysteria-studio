const { DataTypes } = require("sequelize");
const sequelize = require("../config_db/database");

const Servico = sequelize.define("servico", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Servico;
