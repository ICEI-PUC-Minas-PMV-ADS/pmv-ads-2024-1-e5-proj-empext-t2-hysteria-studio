const { DataTypes } = require("sequelize");
const sequelize = require("../config_db/database");

const Usuario = sequelize.define("usuario", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_de_nascimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flag_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Usuario;
