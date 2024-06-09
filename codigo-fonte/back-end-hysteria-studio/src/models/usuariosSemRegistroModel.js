const { DataTypes } = require("sequelize");
const sequelize = require("../config_db/database");

const UsuarioSemRegistro = sequelize.define("usuarios_inexistentes", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = UsuarioSemRegistro;