const Horario = require("../models/horarioModel")
const moment = require('moment-timezone');

async function buscarHorarios(req, res) {
    try {
        const horarios = await Horario.findAll();
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function criarHorarios(req, res) {
    try {
        const { horario_disponivel } = req.body;
        const datateste = moment.tz(horario_disponivel, "DD/MM/YYYY HH:mm", "America/Sao Paulo");
        const horario = await Horario.create({
            horario_disponivel: datateste,
            createdAt: moment().tz('America/Sao_Paulo', true),
            updatedAt: moment().tz('America/Sao_Paulo', true)
        });
        res.status(201).json(horario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    buscarHorarios,
    criarHorarios
};