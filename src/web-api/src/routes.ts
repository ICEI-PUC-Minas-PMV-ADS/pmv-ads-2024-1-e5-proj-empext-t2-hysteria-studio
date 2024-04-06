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

const router = Router();


// Rotas tipos de serviço
router.post('/servico', new CriarServicoController().handle)
router.put('/servico', new AtualizarServicoController().handle)
router.get('/servicos', new ListarServicoController().handle)
router.get('/servico/id', new ListarServicoIdController().handle)
router.delete('/servico', new ExcluirServicoController().handle)

router.post('/usuario', new CriarUsuarioController().handle)


router.post('/agenda', new NovaAgendaController().handle)
router.get('/agenda', new ListarAgendaController().handle)
router.put('/agenda', new FinalizarAgendaController().handle)

export { router };