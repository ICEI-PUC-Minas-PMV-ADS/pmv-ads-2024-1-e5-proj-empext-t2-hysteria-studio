import { Request, Response } from 'express'
import { CriarServicoService } from '../../services/servico/CriarServicoService'

class CriarServicoController{
  async handle(request: Request, response: Response){
    const {nome, preco, descricao } = request.body;

    const criarServicoService = new CriarServicoService();

    const servico = await criarServicoService.execute({
      nome,
      preco,
      descricao
    });

    return response.status(201).json(servico);

  }
}

export { CriarServicoController }