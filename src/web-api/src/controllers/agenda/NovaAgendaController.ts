import { Request, Response } from 'express';
import { NovaAgendaService } from '../../services/agenda/NovaAgendaService'

class NovaAgendaController {
  async handle(request: Request, response: Response) {
    const { usuario, servico, data_hora_atendimento} = request.body;

    const novaAgendaService = new NovaAgendaService();

    try {
      const agenda = await novaAgendaService.execute({ usuario, servico, data_hora_atendimento});
      return response.status(201).json(agenda);
    } catch (error) {
      return response.status(400).json({ error});
    }
  }
}

export { NovaAgendaController };
