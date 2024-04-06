import prismaClient from "../../prisma";

interface ServicoRequest{
  servico_id: string;
  nome: string;
  preco: number;
  descricao: string;
}

class AtualizarServicoService{
  async execute({ servico_id, nome, preco, descricao }: ServicoRequest){

    const servico  = await prismaClient.servico.update({
      where:{
        id: servico_id,
      },
      data:{
        nome: nome,
        preco: preco,
        descricao: descricao,
      }
    })

    return servico;
  }
}

export { AtualizarServicoService }