const Agendamentos = require("../models/agendamentosModel");
const Usuario = require("../models/usuariosModel");
const Servico = require("../models/servicosModel");
const { AgendamentoDto } = require("../models/dto/agendamentoDto");

async function buscarAgendamentos(req, res) {
  try {

    const agendamentos = await Agendamentos.findAll({
      
      include: [
        {
          model: Servico,
          attributes: [ 'id', 'nome'],
          required: true,
        },
        {
          model: Usuario,
          attributes: [ 'id', 'nome'],
          required: true,
        },
      ],
    });

    const agendamentosResponse = []

    for (let index = 0; index < agendamentos.length; index++) {
       const obj = 
       new AgendamentoDto(agendamentos[index].id,
                          agendamentos[index].data_hora_atendimento,
                          agendamentos[index].servico,
                          agendamentos[index].usuario)
       agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  
}

async function criarAgendamento(req, res) {
  try {
    const { id_usuario, id_servico, data_hora_atendimento } = req.body;
    const agendamento = await Agendamentos.create({
      id_usuario,
      id_servico,
      data_hora_atendimento,
    });
    res.status(201).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function excluirAgendamento(req, res) {
  try {

    const { id } = req.params;

    const agendamento = await Agendamentos.findByPk(id);

    if (agendamento) {
      await agendamento.destroy();
      res.json({ message: "Agendamento exluído!" });
    } else {
      res.status(404).json({ message: "Agendamento não existe!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { criarAgendamento, buscarAgendamentos, excluirAgendamento };
