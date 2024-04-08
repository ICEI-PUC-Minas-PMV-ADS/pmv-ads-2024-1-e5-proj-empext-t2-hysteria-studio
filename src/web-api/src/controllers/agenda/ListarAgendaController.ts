import { Request, Response } from 'express';
import { ListarAgendaService } from '../../services/agenda/ListarAgendaService'

class ListarAgendaController {
  async handle(request: Request, response: Response) {

    const listarAgendaService = new ListarAgendaService();

    try {
      const agenda = await listarAgendaService.execute( request.body );

      return response.json(agenda);
    } catch (error) {
      return response.status(400).json({ error: 'Erro ao listar a agenda' });
    }
  }

  async listAll(request: Request, response: Response) {

    const listarAgendaService = new ListarAgendaService();

    try {
      const agenda = await listarAgendaService.execute();

      return response.json(agenda);
    } catch (error) {
      return response.status(400).json({ error: 'Erro ao listar a agenda' });
    }
  }
}

export { ListarAgendaController };
