import { Router, Request, Response } from 'express'

import { CriarServicoController } from './controllers/servico/CriarServicoController'
import { AtualizarServicoController } from './controllers/servico/AtualizarServicoController';
import { ListarServicoController } from './controllers/servico/ListarServicoController';
import { ListarServicoIdController } from './controllers/servico/ListarServicoIdController';
import { ExcluirServicoController } from './controllers/servico/ExcluirServicoController';

import { CriarUsuarioController } from './controllers/usuarioController/CriarUsuarioController';

import { NovaAgendaController } from './controllers/agenda/NovaAgendaController';
import { ListarAgendaController } from './controllers/agenda/ListarAgendaController';
import { FinalizarAgendaController } from './controllers/agenda/FinalizarAgendaController';

import { LoginUsuarioController } from './controllers/login/LoginUsuarioController';

import { AuthMiddleware } from './middlewares/auth';

const router = Router();


// Rotas tipos de serviço
router.post('/servico', new CriarServicoController().handle)
router.put('/servico', new AtualizarServicoController().handle)
router.get('/servicos', new ListarServicoController().handle)
router.get('/servico/id', new ListarServicoIdController().handle)
router.delete('/servico', new ExcluirServicoController().handle)

// Rotas tipos de usuario
router.post('/usuario', new CriarUsuarioController().handle)

// Rotas login do usuário
router.post('/login', new LoginUsuarioController().authenticate)

// Rotas tipos de login
router.post('/usuario/login', new CriarUsuarioController().login)

router.post('/agenda', new NovaAgendaController().handle)
router.get('/agenda', new ListarAgendaController().handle)
router.put('/agenda', new FinalizarAgendaController().handle)

export { router };