const Agendamentos = require("../models/agendamentosModel");
const Usuario = require("../models/usuariosModel");
const Servico = require("../models/servicosModel");
const Horario = require("../models/horarioModel");
const Status = require("../models/statusModel");
const UsuarioSemRegistro = require("../models/usuariosSemRegistroModel");
const moment = require('moment-timezone');
const { AgendamentoDto } = require("../models/dto/agendamentoDto");
const { Op, DATE } = require('sequelize');

async function buscarAgendamentos(req, res) {
  try {
    const agendamentos = await Agendamentos.findAll({
      include: includeObj()
    });

    console.log(agendamentos)

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
       const obj = 
       new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
       agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAgendamentoPorId(req, res) {
  try {
    const agendamento = await Agendamentos.findByPk(req.params.id,
      ({ include: includeObj()
    }));

    const agendamentoResponse = new AgendamentoDto(agendamento.id,
                                agendamento.horario,
                                agendamento.servico,
                                agendamento.usuario,
                                agendamento.status_agendamento,
                                agendamento.usuarios_inexistente)
    res.json(agendamentoResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAgendamentoUsurioPorId(req, res) {
  try {
    const agendamentos = await Agendamentos.findAll({
      where: {
        id_usuario: req.params.id
      },
      include: includeObj()
    });

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
        const obj = 
        new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
        agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAgendamentoUsuarioNome(req, res) {

  try {
    // busca usuario
    var nomeUsuario = "";
    const buscaDeUsuario = await Usuario.findAll({
      where: {
        nome: req.params.nome
      }
    })

    if(buscaDeUsuario == null || buscaDeUsuario.length == 0){
      nomeUsuario = "USUARIO INEXISTENTE";
    }else{
      nomeUsuario = buscaDeUsuario[0].nome;
    }

    // busca usuario inexistente
    var nomeUsuarioInexistente = "";
    const buscaUsuarioInexistente = await UsuarioSemRegistro.findAll({
      where: {
        nome: req.params.nome
      }
    })

    if(buscaUsuarioInexistente == null || buscaUsuarioInexistente.length === 0){
      nomeUsuarioInexistente = "USUARIO EXISTE";
    } else{
      nomeUsuarioInexistente = buscaUsuarioInexistente[0].nome;
    }

    const agendamentos = await Agendamentos.findAll({
      include:   [{
        model: Horario,
        attributes: [ 'horario_disponivel' ],
        where: {
          horario_disponivel: {[Op.between] : [req.params.data_inicio , req.params.data_fim ]}
        },
        required: true,
      },
      {
        model: Usuario,
        attributes: ['id', 'nome'],
        where:{
          nome: nomeUsuario,
        },
        required: true,
      },
      {
        model: Servico,
        attributes: [ 'id', 'nome'],
        required: true,
      },
      {
        model: Horario,
        attributes: [ 'id', 'horario_disponivel'],
        required: true,
      },
      {
        model: Status,
        attributes: ['status_agendamento'],
        required: true,
      },
      {
        model: UsuarioSemRegistro,
        attributes: ['id', 'nome'],
        where:{
          nome: nomeUsuarioInexistente,
        },
        required: true,
      }
    ]
    });

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
        const obj = 
        new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
        agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarHistoricoGeral(req, res) {

  try {
    const agendamentos = await Agendamentos.findAll({
      include:   [{
        model: Horario,
        attributes: [ 'horario_disponivel' ],
        where: {
          horario_disponivel:  {
            [Op.and]: {
              [Op.lte]: moment.tz("America/Sao Paulo")
            }
          }
        },
        required: true,
      },
      {
        model: Usuario,
        attributes: ['id', 'nome'],
        required: true,
      },
      {
        model: Servico,
        attributes: [ 'id', 'nome'],
        required: true,
      },
      {
        model: Horario,
        attributes: [ 'id', 'horario_disponivel'],
        required: true,
      },
      {
        model: Status,
        attributes: ['status_agendamento'],
        required: true,
      },
      {
        model: UsuarioSemRegistro,
        attributes: ['id', 'nome'],
        required: true,
      }
    ]
    });

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
        const obj = 
        new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
        agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarHistoricoAgendamentoUsuario(req, res) {

  try {
    const agendamentos = await Agendamentos.findAll({
      include:   [{
        model: Horario,
        attributes: [ 'horario_disponivel' ],
        where: {
          horario_disponivel:  {
            [Op.and]: {
              [Op.lte]: moment.tz("America/Sao Paulo")
            }
          }
        },
        required: true,
      },
      {
        model: Usuario,
        attributes: ['nome'],
        where:{
          nome: req.params.nome,
        },
        required: true,
      },
      {
        model: Servico,
        attributes: [ 'id', 'nome'],
        required: true,
      },
      {
        model: Horario,
        attributes: [ 'id', 'horario_disponivel'],
        required: true,
      },
      {
        model: Status,
        attributes: ['status_agendamento'],
        required: true,
      },
      {
        model: UsuarioSemRegistro,
        attributes: ['id', 'nome'],
        required: true,
      }
    ]
    });

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
        const obj = 
        new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
        agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarHistoricoAgendamentoUsuarioPorId(req, res) {

  var whereInclude = {
    model: Horario,
    attributes: [ 'horario_disponivel' ],
    where: {
      horario_disponivel:  {
        [Op.and]: {
          [Op.lte]: moment.tz("America/Sao Paulo")
        }
      }
    },
    required: true,
  }

  var arrayInclude = includeObj();
  arrayInclude.push(whereInclude)

  try {
    const agendamentos = await Agendamentos.findAll({
      where: {
        id_usuario: req.params.id
      },
      include: arrayInclude,
    });

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
        const obj = 
        new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
        agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAgendamentoFuturosGeral(req, res) {

  console.log("AQUI ----------------------------------------------------------------------------------------------------->", moment().local())
  try {
    const agendamentos = await Agendamentos.findAll({
      include:   [{
        model: Horario,
        attributes: [ 'horario_disponivel' ],
        where: {
          horario_disponivel:  {
            [Op.and]: {
              [Op.gte]: moment().local()
            }
          }
        },
        required: true,
      },
      {
        model: Usuario,
        attributes: ['nome'],
        required: true,
      },
      {
        model: Servico,
        attributes: [ 'id', 'nome'],
        required: true,
      },
      {
        model: Horario,
        attributes: [ 'id', 'horario_disponivel'],
        required: true,
      },
      {
        model: Status,
        attributes: ['status_agendamento'],
        where: {
          id: [1, 2]
        },
        required: true,
      },
      {
        model: UsuarioSemRegistro,
        attributes: ['id', 'nome'],
        required: true,
      }
    ]
    });

    console.log("AQUI ----------------------------------------------------------------------------------------------------->")

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
        const obj = 
        new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
        agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAgendamentoFuturosUsuario(req, res) {

  try {
    const agendamentos = await Agendamentos.findAll({
      include:   [{
        model: Horario,
        attributes: [ 'horario_disponivel' ],
        where: {
          horario_disponivel:  {
            [Op.and]: {
              [Op.gte]: moment().local()
            }
          }
        },
        required: true,
      },
      {
        model: Usuario,
        attributes: ['nome'],
        where:{
          nome: req.params.nome,
        },
        required: true,
      },
      {
        model: Servico,
        attributes: [ 'id', 'nome'],
        required: true,
      },
      {
        model: Horario,
        attributes: [ 'id', 'horario_disponivel'],
        required: true,
      },
      {
        model: Status,
        attributes: ['status_agendamento'],
        where: {
          id: [1, 2]
        },
        required: true,
      },
      {
        model: UsuarioSemRegistro,
        attributes: ['id', 'nome'],
        required: true,
      }
    ]
    });

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
        const obj = 
        new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
        agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarAgendamentoFuturosUsuarioPorId(req, res) {

  var whereInclude = {
    model: Horario,
    attributes: [ 'horario_disponivel' ],
    where: {
      horario_disponivel:  {
        [Op.and]: {
          [Op.gte]: moment().local()
        }
      }
    },
    required: true,
  }

  var whereCondicaoAgendamentoFuturos = {
    model: Status,
    attributes: ['status_agendamento'],
    where: {
      id: [1, 2]
    },
    required: true,
  }

  var arrayInclude = includeObj();
  arrayInclude.push(whereInclude)
  arrayInclude.push(whereCondicaoAgendamentoFuturos)

  try {
    const agendamentos = await Agendamentos.findAll({
      where: {
        id_usuario: req.params.id
      },
      include: arrayInclude,
    });

    const agendamentosResponse = []

    for (let i = 0; i < agendamentos.length; i++) {
        const obj = 
        new AgendamentoDto(agendamentos[i].id,
                          agendamentos[i].horario,
                          agendamentos[i].servico,
                          agendamentos[i].usuario,
                          agendamentos[i].status_agendamento,
                          agendamentos[i].usuarios_inexistente)
        agendamentosResponse.push(obj)
    }

    res.json(agendamentosResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function criarAgendamento(req, res) {
  try {
    const { id_usuario, nome, email, id_servico, id_horario } = req.body;
    const id_status = 1;

    if(id_usuario != null){
      const agendamento = await Agendamentos.create({
        id_usuario,
        id_servico,
        id_horario,
        id_status,
        id_usuarioInexistente: -1,
        createdAt: moment().tz('America/Sao_Paulo').toDate(),
        updatedAt: moment().tz('America/Sao_Paulo').toDate(),
      });
      res.status(201).json(agendamento);

    } else{
      const usuarioInexistente = await UsuarioSemRegistro.create({
        nome,
        email,
        createdAt: moment().tz('America/Sao_Paulo').toDate(),
        updatedAt: moment().tz('America/Sao_Paulo').toDate(),
      });

      const agendamento = await Agendamentos.create({
        id_usuario: -1,
        id_servico,
        id_horario,
        id_status,
        id_usuarioInexistente: usuarioInexistente.id,
        createdAt: moment().tz('America/Sao_Paulo').toDate(),
        updatedAt: moment().tz('America/Sao_Paulo').toDate(),
      });

      res.status(201).json(agendamento);
    }
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

async function atualizarAgendamento(req, res) {
  try {
    const { id } = req.params;
    const {id_usuario, id_servico, id_horario, id_status} = req.body;
    const agendamento = await Agendamentos.findByPk(id);

    const dataUpdated = {
        id_usuario, id_servico, id_horario, id_status
      }

    const selector = {
      where: {
        id
      }
    }

    if (agendamento) {
      await Agendamentos.update( dataUpdated, selector );
      const agendamentoAtualizado = await Agendamentos.findByPk(id);
      res.json(agendamentoAtualizado);
    } else {
      res.status(404).json({ message: 'Agendamento não existe' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function confirmarAgendamento(req, res) {
  try {
    const { id } = req.params;
    const {id_status} = req.body;
    const agendamento = await Agendamentos.findByPk(id);

    const dataUpdated = {
      id_status
    }

    const selector = {
      where: {
        id
      }
    }

    if (agendamento) {
      await Agendamentos.update( dataUpdated, selector );
      const agendamentoAtualizado = await Agendamentos.findByPk(id);
      res.json(agendamentoAtualizado);
    } else {
      res.status(404).json({ message: 'Agendamento não existe' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const includeObj = ()=>{
  return [{
    model: Servico,
    attributes: [ 'id', 'nome'],
    required: true,
  },
  {
    model: Usuario,
    attributes: ['id', 'nome'],
    required: true,
  },
  {
    model: Horario,
    attributes: [ 'id', 'horario_disponivel'],
    required: true,
  },
  {
    model: Status,
    attributes: ['status_agendamento'],
    required: true,
  },
  {
    model: UsuarioSemRegistro,
    attributes: ['id', 'nome'],
    required: true,
  }]
}

module.exports = { buscarAgendamentos, buscarAgendamentoPorId, buscarAgendamentoUsuarioNome, buscarAgendamentoFuturosGeral, buscarAgendamentoFuturosUsuarioPorId,  buscarAgendamentoFuturosUsuario, buscarHistoricoGeral, buscarHistoricoAgendamentoUsuario, buscarHistoricoAgendamentoUsuarioPorId, criarAgendamento, excluirAgendamento, atualizarAgendamento, confirmarAgendamento, buscarAgendamentoUsurioPorId };
