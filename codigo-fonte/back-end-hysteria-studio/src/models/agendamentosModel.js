const { DataTypes } = require("sequelize");
const sequelize = require("../config_db/database.js");
const Usuario = require("./usuariosModel.js");
const Servico = require("./servicosModel.js");
const Horario = require("./horarioModel.js");
const Status = require("./statusModel.js");
const UsuarioSemRegistro = require("./usuariosSemRegistroModel.js");

const Agendamentos = sequelize.define("agendamentos", {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_servico: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_horario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuarioInexistente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Agendamentos.belongsTo(Usuario, { foreignKey: 'id_usuario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agendamentos.belongsTo(Servico, { foreignKey: 'id_servico', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agendamentos.belongsTo(Horario, { foreignKey: 'id_horario', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agendamentos.belongsTo(Status, { foreignKey: 'id_status', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Agendamentos.belongsTo(UsuarioSemRegistro, { foreignKey: 'id_usuarioInexistente', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

sequelize.sync({ force: true });

module.exports = Agendamentos;
