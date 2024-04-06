import { Request, Response } from 'express'
import { AtualizarServicoService } from '../../services/servico/AtualizarServicoService'

class AtualizarServicoController{
  async handle(request: Request, response: Response){
    const { servico_id, nome, preco, descricao } = request.body;

    const atualizarServico = new AtualizarServicoService();

    const servico = await atualizarServico.execute({
      servico_id,
      nome,
      preco,
      descricao
    });

    return response.json(servico);

  }
}

export { AtualizarServicoController }