import { Request, Response } from 'express'
import { ListarServicoService } from '../../services/servico/ListarServicoService'

class ListarServicoController{
  async handle(request: Request, response: Response){
    const { servico_id } = request.body;

    const listarServico = new ListarServicoService();

    const servicos = await listarServico.execute({
      servico_id,
    });

    return response.json(servicos);

  }
}

export { ListarServicoController }