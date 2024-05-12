const { DataTypes } = require("sequelize");
const sequelize = require("../config_db/database.js");
const Usuario = require("./usuariosModel.js");
const Servico = require("./servicosModel.js");

const Agendamentos = sequelize.define("agendamentos", {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_servico: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_hora_atendimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Agendamentos.belongsTo(Usuario, { foreignKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agendamentos.belongsTo(Servico, { foreignKey: 'id_servico', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

sequelize.sync({ force: true });

module.exports = Agendamentos;
