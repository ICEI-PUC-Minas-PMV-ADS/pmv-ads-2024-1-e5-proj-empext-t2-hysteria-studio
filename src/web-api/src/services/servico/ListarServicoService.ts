import prismaClient from "../../prisma";

interface ServicoRequest{
  servico_id: string;
}

class ListarServicoService{
  async execute({ servico_id }: ServicoRequest){

    const servico = await prismaClient.servico.findMany({
      where:{
        id: servico_id, 
      }
    })
    return servico;
  }
}

export { ListarServicoService }