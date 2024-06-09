const { where } = require('sequelize');
const Usuario = require('../models/usuariosModel');

async function buscarUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    usuarios.shift()
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function buscarUsuarioPorId(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function criarUsuario(req, res) {
  try {
    const { nome, cpf, data_de_nascimento, telefone, endereco, email, flag_maior_idade, nome_responsavel, contato_responsavel, login, senha, flag_admin } = req.body;
    const usuario = await Usuario.create({ nome, cpf, data_de_nascimento, telefone, endereco, email, flag_maior_idade, nome_responsavel, contato_responsavel, login, senha, flag_admin });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function excluirUsuario(req, res) {
  try {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
      await usuario.destroy();
      res.json({ message: 'Usuário exluído!' });
    } else {
      res.status(404).json({ message: 'Usuário não existe!' });
    }


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nome, cpf, data_de_nascimento, telefone, email, senha, flag_admin } = req.body;
    const usuario = await Usuario.findByPk(id);

    const dataUpdated = {
        nome, cpf, data_de_nascimento, telefone, email, senha, flag_admin
      }

    const selector = {
      where: {
        id
      }
    }

    if (usuario) {
      await Usuario.update( dataUpdated, selector );
      const usuarioAtualizado = await Usuario.findByPk(id);
      res.json(usuarioAtualizado);
    } else {
      res.status(404).json({ message: 'Usuário não existe' });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
  
module.exports = {
  criarUsuario,
  buscarUsuarios,
  buscarUsuarioPorId,
  excluirUsuario,
  atualizarUsuario
};