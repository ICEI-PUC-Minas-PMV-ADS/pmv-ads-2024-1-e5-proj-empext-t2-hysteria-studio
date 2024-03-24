import prismaClient from "../../prisma";

interface ListarIdRequest{
  servico_id: string;
}

class ListarServicoIdService{
  async execute({ servico_id }: ListarIdRequest){

    const servico = await prismaClient.servico.findFirst({
      where:{
        id: servico_id, 
      }
    })
    
    return servico;
  }
}

export { ListarServicoIdService }