import { Router, Request, Response } from 'express'
import { CriarServicoController } from './controllers/servico/CriarServicoController'

const router = Router();


// Rotas tipos de serviço
router.post('/servico', new CriarServicoController().handle)

export { router };