const Usuario = require("../models/usuariosModel");
const sequelize = require("../config_db/database");
const { query } = require("express");
const { Op } = require("sequelize");

async function loginUsuario(req, res) {

  const result = await Usuario.findOne({where:{[Op.and]:[{email:req.body.email},{senha: req.body.senha}]}})

  if(result == null){
    res.status(404).json({mensagem: "Usuário não existe!"})
    return
  }

  res.json(result)
}

module.exports = {loginUsuario};