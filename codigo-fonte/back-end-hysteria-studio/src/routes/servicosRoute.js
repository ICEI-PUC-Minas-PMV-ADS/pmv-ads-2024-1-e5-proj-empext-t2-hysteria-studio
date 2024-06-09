const express = require('express');
const router = express.Router();
const servicoController = require('../controllers/servicosController');

router.get('/servicos', servicoController.buscarServicos);
router.get('/servico/:id', servicoController.buscarServicoPorId);
router.post('/servico', servicoController.criarServico);
router.delete('/servico/:id', servicoController.excluirServico);
router.put('/servico/:id', servicoController.atualizarServico);

module.exports = router;