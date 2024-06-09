const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/horariosController');

router.get('/horarios', agendamentosController.buscarHorarios);
router.post('/horario', agendamentosController.criarHorarios);

module.exports = router;