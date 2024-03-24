import { Request, Response } from 'express'
import { ExcluirServicoService } from '../../services/servico/ExcluirServicoService'

class ExcluirServicoController{
  async handle(request: Request, response: Response){
    const { servico_id } = request.body;

    const excluirServico = new ExcluirServicoService();

    const servico = await excluirServico.execute({
      servico_id,
    });

    return response.json(servico);

  }
}

export { ExcluirServicoController }