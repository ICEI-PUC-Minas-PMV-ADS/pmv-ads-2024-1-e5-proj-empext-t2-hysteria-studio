import { Request, Response } from 'express';
import { FinalizarAgendaService }from '../../services/agenda/FinalizarAgendaService'

class FinalizarAgendaController {
  async handle(request: Request, response: Response) {
    const { agenda_id, user_id } = request.body;

    const finalizarAgendaService = new FinalizarAgendaService();

    try {
      const result = await finalizarAgendaService.execute({ agenda_id, user_id });
      return response.json(result);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { FinalizarAgendaController };
