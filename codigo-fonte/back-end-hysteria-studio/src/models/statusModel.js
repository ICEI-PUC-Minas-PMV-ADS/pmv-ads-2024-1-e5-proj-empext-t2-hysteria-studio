const { DataTypes } = require("sequelize");
const sequelize = require("../config_db/database.js");

const StatusAgendamentos = sequelize.define("status_agendamentos", {
  status_agendamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = StatusAgendamentos;