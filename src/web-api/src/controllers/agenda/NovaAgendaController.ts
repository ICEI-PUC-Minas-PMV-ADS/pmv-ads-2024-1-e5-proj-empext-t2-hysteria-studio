import { Request, Response } from 'express';
import { NovaAgendaService } from '../../services/agenda/NovaAgendaService'

class NovaAgendaController {
  async handle(request: Request, response: Response) {
    const { user_id, servico_id, cliente } = request.body;

    const novaAgendaService = new NovaAgendaService();

    try {
      const agenda = await novaAgendaService.execute({ user_id, servico_id, cliente });
      return response.status(201).json(agenda);
    } catch (error) {
      return response.status(400).json({ error});
    }
  }
}

export { NovaAgendaController };
