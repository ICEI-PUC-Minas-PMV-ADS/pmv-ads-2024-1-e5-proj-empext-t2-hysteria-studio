import { Router, Request, Response } from 'express'
import { CriarServicoController } from './controllers/servico/CriarServicoController'
import { AtualizarServicoController } from './controllers/servico/AtualizarServicoController';
import { ListarServicoController } from './controllers/servico/ListarServicoController';
import { ListarServicoIdController } from './controllers/servico/ListarServicoIdController';

const router = Router();


// Rotas tipos de serviço
router.post('/servico', new CriarServicoController().handle)
router.put('/servico', new AtualizarServicoController().handle)
router.get('/servicos', new ListarServicoController().handle)
router.get('/servico/id', new ListarServicoIdController().handle)

export { router };