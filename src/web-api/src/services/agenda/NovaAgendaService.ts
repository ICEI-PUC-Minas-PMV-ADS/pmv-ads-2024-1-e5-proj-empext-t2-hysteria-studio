import prismaClient from "../../prisma";

interface AgendaRequest{
  usuario: string;
  servico: string;
  data_hora_atendimento: Date;
}

class NovaAgendaService{
  async execute({ usuario, servico, data_hora_atendimento}: AgendaRequest){

    if(!data_hora_atendimento || servico === '' || usuario === ''){
      throw new Error("Erro ao agendar novo serviço.")
    }

    const data_hora = new Date( data_hora_atendimento );

    const agenda = await prismaClient.agenda.create({
      data:{
        servico_id: servico,
        usuarioId: usuario,
        data_hora_atendimento: data_hora
      }
    })

   return agenda;
  }
}

export { NovaAgendaService }