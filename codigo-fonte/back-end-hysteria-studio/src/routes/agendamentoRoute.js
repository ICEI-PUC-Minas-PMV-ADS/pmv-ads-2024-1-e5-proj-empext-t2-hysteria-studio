const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');

router.get('/agendamentos', agendamentosController.buscarAgendamentos);
router.get('/agendamento/:id', agendamentosController.buscarAgendamentoPorId);
router.get('/agendamento/usuario/:id', agendamentosController.buscarAgendamentoUsurioPorId);
router.get('/agendamento/usuario/detalhado/:nome/:data_inicio/:data_fim', agendamentosController.buscarAgendamentoUsuarioNome);


// historico
router.get('/agendamentos/historico', agendamentosController.buscarHistoricoGeral);
router.get('/agendamentos/usuario/historico/:nome', agendamentosController.buscarHistoricoAgendamentoUsuario);
router.get('/agendamentos/usuario/historico/id/:id', agendamentosController.buscarHistoricoAgendamentoUsuarioPorId);


// agendamentos futuros 
router.get('/agendamentos/futuros', agendamentosController.buscarAgendamentoFuturosGeral);
router.get('/agendamentos/usuario/futuros/:nome', agendamentosController.buscarAgendamentoFuturosUsuario);
router.get('/agendamentos/usuario/futuros/id/:id', agendamentosController.buscarAgendamentoFuturosUsuarioPorId);


router.post('/agendamento', agendamentosController.criarAgendamento);
router.delete('/agendamento/:id', agendamentosController.excluirAgendamento);
router.put('/agendamento/:id', agendamentosController.atualizarAgendamento);
router.patch('/agendamento/:id', agendamentosController.confirmarAgendamento);

module.exports = router;