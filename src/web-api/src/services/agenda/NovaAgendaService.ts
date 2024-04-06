import prismaClient from "../../prisma";

interface AgendaRequest{
  user_id: string;
  servico_id: string;
  cliente: string;
}

class NovaAgendaService{
  async execute({ user_id, servico_id, cliente}: AgendaRequest){

    if(cliente === '' || servico_id === ''){
      throw new Error("Erro ao agendar novo serviço.")
    }

    const agenda = await prismaClient.servico.create({
      data:{
        cliente,
        servico_id,
        user_id
      }
    })

   return agenda;
  }
}

export { NovaAgendaService }