const { where } = require('sequelize');
const Servicos = require('../models/servicosModel.js');

async function buscarServicos(req, res) {
  try {
    const servicos = await Servicos.findAll();
    res.json(servicos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarServicoPorId(req, res) {
  try {
    const servico = await Servicos.findByPk(req.params.id);
    res.json(servico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function criarServico(req, res) {
  try {
    const { nome, preco, descricao } = req.body;
    const servico = await Servicos.create({ nome, preco, descricao });
    res.status(201).json(servico);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function excluirServico(req, res) {
  try {

    const { id } = req.params;

    const servico = await Servicos.findByPk(id);

    if (servico) {
      await servico.destroy();
      res.json({ message: 'Serviço exluído!' });
    } else {
      res.status(404).json({ message: 'Serviço não existe!' });
    }


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function atualizarServico(req, res) {
  try {
    const { id } = req.params;
    const { nome, preco, descricao } = req.body;
    const servico = await Servicos.findByPk(id);

    const dataUpdated = {
        nome,
        preco, 
        descricao 
      }

    const selector = {
      where: {
        id
      }
    }

    if (servico) {
      await Servicos.update( dataUpdated, selector );
      const servicoAtualizado = await Servicos.findByPk(id);
      res.json(servicoAtualizado);
    } else {
      res.status(404).json({ message: 'Servico não existe' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  
module.exports = {
  criarServico,
  buscarServicos,
  buscarServicoPorId,
  excluirServico,
  atualizarServico
};