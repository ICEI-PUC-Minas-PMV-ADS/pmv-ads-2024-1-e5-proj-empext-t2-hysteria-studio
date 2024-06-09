const { DataTypes } = require("sequelize");
const sequelize = require("../config_db/database");
const moment = require('moment-timezone');

const Horario = sequelize.define("horario", {
  horario_disponivel: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => moment().tz('America/Sao_Paulo').toDate(),
  },
});

module.exports = Horario;