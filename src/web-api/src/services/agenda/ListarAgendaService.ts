import prismaClient from "../../prisma";

interface ListarAgendaRequest{
  user_id: string;
}

class ListarAgendaService{
  async execute({ user_id }: ListarAgendaRequest){

    const agenda = await prismaClient.servico.findMany({
      where:{
        user_id: user_id,
      },
      select:{
        id: true,
        cliente: true,
        Servico: true,
      }
    })

    return agenda;
  }
}

export { ListarAgendaService }