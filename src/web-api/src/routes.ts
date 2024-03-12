import { Router, Request, Response } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { isAuthenticate } from './middlewares/isAuthenticate';


import { CreateHaircutController } from './controllers/haircut/CreateHaircutController'
import { ListHaircutController } from './controllers/haircut/ListHaircutController'
import { UpdateHaircutController } from './controllers/haircut/UpdateHaircutController'
import { CheckSubscriptionController } from './controllers/haircut/CheckSubscriptionController'
import { CountHaircutController } from './controllers/haircut/CountHaircutController'
import { DetailHaircutController } from './controllers/haircut/DetailHaircutController'

import { NewScheduleController } from './controllers/schedule/NewScheduleController'
import { ListScheduleController } from './controllers/schedule/ListScheduleController'
import { FinishScheduleController } from './controllers/schedule/FinishScheduleController'

const router = Router();

// Rotas usuários
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticate, new DetailUserController().handle)
router.put('/users', isAuthenticate, new UpdateUserController().handle)


// Rotas modelos de corte
router.post('/haircut', isAuthenticate, new CreateHaircutController().handle)
router.get('/haircuts', isAuthenticate, new ListHaircutController().handle)
router.put('/haircut', isAuthenticate, new UpdateHaircutController().handle)
router.get('/haircut/check', isAuthenticate, new CheckSubscriptionController().handle)
router.get('/haircut/count', isAuthenticate, new CountHaircutController().handle)
router.get('/haircut/detail', isAuthenticate, new DetailHaircutController().handle)

// Rotas agendamento
router.post('/schedule', isAuthenticate, new NewScheduleController().handle)
router.get('/schedule', isAuthenticate, new ListScheduleController().handle)
router.delete('/schedule', isAuthenticate, new FinishScheduleController().handle)

export { router };