const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');

router.get('/usuarios', usuarioController.buscarUsuarios);
router.get('/usuario/:id', usuarioController.buscarUsuarioPorId);
router.post('/usuario', usuarioController.criarUsuario);
router.delete('/usuario/:id', usuarioController.excluirUsuario);
router.put('/usuario/:id', usuarioController.atualizarUsuario);

module.exports = router;