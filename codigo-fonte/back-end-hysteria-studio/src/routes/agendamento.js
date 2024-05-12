const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');

router.get('/agendamentos', agendamentosController.buscarAgendamentos);
router.post('/agendamento', agendamentosController.criarAgendamento);
router.delete('/agendamento/:id', agendamentosController.excluirAgendamento);

module.exports = router;