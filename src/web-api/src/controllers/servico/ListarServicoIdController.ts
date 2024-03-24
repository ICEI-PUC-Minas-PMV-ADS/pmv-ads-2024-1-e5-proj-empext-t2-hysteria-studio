import { Request, Response } from 'express'
import { ListarServicoIdService } from '../../services/servico/ListarServicoIdService'

class ListarServicoIdController{
  async handle(request: Request, response: Response){
    const { servico_id } = request.body;

    const listarServicoId = new ListarServicoIdService();

    const servico = await listarServicoId.execute({
      servico_id,
    });

    return response.json(servico);

  }
}

export { ListarServicoIdController }